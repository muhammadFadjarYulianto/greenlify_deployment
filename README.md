# Greenlify

<p align="center">
  <img src="https://ik.imagekit.io/3s8oi0rad/Members/logo-erstalent.png?updatedAt=1734036269066" alt="Greenlify Logo" width="200" height="220">
</p>
<p align="justify">
Greenlify is a waste management web application built using Flask. This application helps users manage and recycle waste effectively. With an intuitive interface and innovative features, Greenlify Flask aims to raise awareness about sustainability and support better waste management practices.
</p>

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- [Python](https://www.python.org/) (version 3.10 or less)
- [pip](https://pip.pypa.io/) (comes with Python)
- [Virtual Environment](https://docs.python.org/3/library/venv.html) (optional but recommended)

## Installation

To set up this project in your local environment, follow these steps:

1. **Clone the Repository**
```bash
git clone https://github.com/fahmi-kartika/greenlify_backend.git
cd greenlify_backend
```

2. **Create Virtual Environment**
```bash
python -m venv env
source env/bin/activate        # For Mac/Linux
env\Scripts\activate           # For Windows
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

4. **Setup Environment**
```bash
rename file .env.example to .env
setup your environment
```

5. **Run Database Migration**
```bash
flask db upgrade
```

6. **Run Database Seeder**
```bash
python seeders.py
```

7. **Run the Application**
```bash
flask run
```
## The application will be available at http://127.0.0.1:5000

## Contact

If you have any questions or feedback, feel free to reach out to us at [ErsTalent].
