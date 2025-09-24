from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from decimal import Decimal, InvalidOperation
from .models import Account
from .serializers import AccountSerializer
import re

# how amt we have 
def parse_amount(value):
    try:
        amt = Decimal(str(value))
    except (InvalidOperation, TypeError):
        return None
    return amt.quantize(Decimal("0.01")) if amt > 0 else None


@api_view(["POST"])
def login_view(request):
    try:
        acc_no = request.data.get("account_number")
        pin = request.data.get("pin")

        if not acc_no or not pin:
            return Response(
                {"error": "account_number and pin required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not re.fullmatch(r"^[A-Za-z0-9]{6,18}$", acc_no):
            return Response(
                {"error": "account_number must be 6 to 18 characters (letters/numbers)"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not re.fullmatch(r"^\d{4}$", pin):
            return Response(
                {"error": "PIN must be exactly 4 digits"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        account = get_object_or_404(Account, account_number=acc_no)

        if not account.check_pin(pin):
            return Response(
                {"error": "Invalid PIN"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(AccountSerializer(account).data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
def deposit_view(request):
    try:
        acc_no = request.data.get("account_number")
        amount = parse_amount(request.data.get("amount"))
        if not acc_no or amount is None:
            return Response({"error": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST)

        account = get_object_or_404(Account, account_number=acc_no)
        account.balance += amount
        account.save(update_fields=["balance"])
        account.add_transaction("Deposit", amount)

        return Response(AccountSerializer(account).data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def withdraw_view(request):
    try:
        acc_no = request.data.get("account_number")
        amount = parse_amount(request.data.get("amount"))
        if not acc_no or amount is None:
            return Response({"error": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST)

        account = get_object_or_404(Account, account_number=acc_no)
        if account.balance < amount:
            return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)

        account.balance -= amount
        account.save(update_fields=["balance"])
        account.add_transaction("Withdraw", amount)

        return Response(AccountSerializer(account).data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def transfer_view(request):
    try:
        from_acc_no = request.data.get("from_account")# temp
        to_acc_no = request.data.get("to_account")
        amount = parse_amount(request.data.get("amount"))

        if not from_acc_no or not to_acc_no or amount is None:
            return Response({"error": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST)

        if from_acc_no == to_acc_no:
            return Response({"error": "Cannot transfer to same account"}, status=status.HTTP_400_BAD_REQUEST)

        from_acc = get_object_or_404(Account, account_number=from_acc_no)
        to_acc = get_object_or_404(Account, account_number=to_acc_no)

        if from_acc.balance < amount:
            return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)

        from_acc.balance -= amount
        to_acc.balance += amount
        from_acc.save(update_fields=["balance"])
        to_acc.save(update_fields=["balance"])

        from_acc.add_transaction("Transfer Out", amount, target_account=to_acc.account_number)
        to_acc.add_transaction("Transfer In", amount, target_account=from_acc.account_number)

        return Response(AccountSerializer(from_acc).data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def history_view(request, acc_no):
    try:
        account = get_object_or_404(Account, account_number=acc_no)
        return Response((account.transaction_history or [])[:5])
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
