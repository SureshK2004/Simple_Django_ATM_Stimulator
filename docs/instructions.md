
````markdown
# ATM Django Project - Instructions

## Overview
This project is a simple ATM system built using Django.  
It allows users to:

- Create accounts with account numbers and PINs
- Check balance
- Make deposits and withdrawals
- View transaction history

The system ensures security by hashing PINs and validating account credentials.

---

## Features

1. **Account Management**
   - Unique `account_number` for each user
   - Securely hashed 4-digit PINs
   - Initial balance can be set during account creation

2. **Transaction Management**
   - Deposit and withdrawal operations are recorded in `transaction_history`
   - Only the last 50 transactions are stored per account
   - Transaction entry stores:
     - Type (`deposit`, `withdrawal`, `transfer`)
     - Amount
     - Target account (if applicable)
     - Timestamp

3. **Authentication**
   - Login requires `account_number` and PIN
   - PIN is verified against the hashed value stored in the database
   - Invalid credentials are rejected

---

## Validation Rules

- **Account Number**: 9–18 digits
- **PIN**: Exactly 4 digits
- **Balance**: Minimum 0.00 (cannot go negative)

---

## Database Models

### Account
| Field                 | Type           | Description |
|-----------------------|----------------|-------------|
| `account_number`      | CharField      | Unique account number |
| `pin`                 | CharField      | Hashed 4-digit PIN |
| `balance`             | DecimalField   | Current account balance |
| `transaction_history` | JSONField      | List of last 50 transactions |
| `created_at`          | DateTimeField  | Account creation timestamp |
| `updated_at`          | DateTimeField  | Last update timestamp |

---

## Commands

### Seed Sample Accounts
```bash
python manage.py seed_accounts
````

* Seeds predefined accounts with hashed PINs and balances.
* Default sample accounts:

  * `ACC1001ACC1001` / `1234` → 1000.00 balance
  * `ACC1002ACC1001` / `4321` → 500.00 balance

---

## Notes

* Always use `set_pin()` to store a new PIN
* `transaction_history` stores JSON objects for each transaction
* Login API returns account details only after validating credentials



