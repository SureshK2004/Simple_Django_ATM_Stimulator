from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.core.validators import MinValueValidator
from decimal import Decimal
from django.utils import timezone


class Account(models.Model):
    account_number = models.CharField(max_length=32, unique=True)
    pin = models.CharField(max_length=128)  
    balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00"),
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    transaction_history = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    # this is used for password hashing
    def set_pin(self, raw_pin: str, commit: bool = True):
        self.pin = make_password(raw_pin)
        if commit:
            self.save(update_fields=["pin"])

    # this is used for hashed password to normal password and check it 
    def check_pin(self, raw_pin: str) -> bool:
        return check_password(raw_pin, self.pin)

    def add_transaction(self, txn_type: str, amount: Decimal, target_account=None):
        entry = {
            "type": txn_type,
            "amount": str(amount.quantize(Decimal("0.01"))),
            "target_account": target_account,
            "timestamp": timezone.now().isoformat(),
        }
        history = self.transaction_history or []
        history.insert(0, entry)
        self.transaction_history = history[:50]
        self.save(update_fields=["transaction_history"])

    def __str__(self):
        return f"Account {self.account_number} | Balance: {self.balance}"
