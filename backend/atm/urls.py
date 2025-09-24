from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="atm-login"),
    path("deposit/", views.deposit_view, name="atm-deposit"),
    path("withdraw/", views.withdraw_view, name="atm-withdraw"),
    path("transfer/", views.transfer_view, name="atm-transfer"),
    path("history/<str:acc_no>/", views.history_view, name="atm-history"),
]
