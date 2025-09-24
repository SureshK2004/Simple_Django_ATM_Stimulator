# Simple_Django_ATM_Stimulator
Using Djagno Rest API


````markdown
# ATM Django Project - Usage Guide

## Setup

1. Clone the repository:

```bash
git clone <repo_url>
cd <project_folder>
````

2. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

pip install -r requirements.txt
```

3. Apply migrations:

```bash
python manage.py migrate
```

4. Seed sample accounts:

```bash
python manage.py seed_accounts
```

---

## Running the Server

Start the Django development server:

```bash
python manage.py runserver
```

Server runs at: `http://127.0.0.1:8000/`

---

## API Endpoints

### 1. Login

* **URL:** `/api/login/`
* **Method:** `POST`
* **Request Body:**

```json
{
    "account_number": "ACC1001",
    "pin": "1234"
}
```

* **Response:** Account details if successful

---

### 2. Deposit

* **URL:** `/api/deposit/`
* **Method:** `POST`
* **Request Body:**

```json
{
    "account_number": "ACC1001",
    "pin": "1234",
    "amount": 500
}
```

---

### 3. Withdraw

* **URL:** `/api/withdraw/`
* **Method:** `POST`
* **Request Body:**

```json
{
    "account_number": "ACC1001",
    "pin": "1234",
    "amount": 200
}
```

---

### 4. Transaction History

* **URL:** `/api/transactions/`
* **Method:** `GET`
* **Request Parameters:**

```json
{
    "account_number": "ACC1001",
    "pin": "1234"
}
```

---

## Notes

* Use valid `account_number` (9–18 digits) and PIN (4 digits)
* Deposits and withdrawals update the balance and transaction history
* Only last 50 transactions are saved
* For security, never expose raw PINs



