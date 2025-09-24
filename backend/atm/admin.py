from django.contrib import admin
from .models import Account

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ("account_number", "balance", "created_at")
    readonly_fields = ("transaction_history", "created_at", "updated_at")
