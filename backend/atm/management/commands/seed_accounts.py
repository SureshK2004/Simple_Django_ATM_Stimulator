from django.core.management.base import BaseCommand
from atm.models import Account

class Command(BaseCommand):
    help = "Seed sample accounts"

    def handle(self, *args, **options):
        samples = [
            {"account_number": "ACC1001ACC1001", "pin": "1234", "balance": "1000.00"},
            {"account_number": "ACC1002ACC1001", "pin": "4321", "balance": "500.00"},
            {"account_number": "SUR6379991294", "pin": "2003", "balance": "1200.00"},
           
        ]
        for s in samples:
            acc, created = Account.objects.get_or_create(account_number=s["account_number"])
            acc.balance = s["balance"]
            acc.set_pin(s["pin"])
            acc.save()
            self.stdout.write(self.style.SUCCESS(f"Seeded {acc.account_number}"))
