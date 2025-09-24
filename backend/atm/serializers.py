from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'account_number', 'balance', 'transaction_history']
        read_only_fields = ['id', 'balance', 'transaction_history']
