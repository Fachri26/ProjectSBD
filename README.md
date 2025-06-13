CARA RUN PROGRAM

1. Buat virtual environtment
python -m venv venv
venv\Scripts\activate        # Untuk Windows
# source venv/bin/activate   # Untuk (Linux/Mac)

2. Install Mysql & MongoDB(mongosh) di komputer masing-masing

3. Install Dependensi
pip install -r requirements.txt

4. Setup Mysql
mysql -u root -p -e "CREATE DATABASE projectSBD"
mysql -u root -p projectSBD < mysql/struktur_tabel.sql
mysql -u root -p projectSBD < mysql/data.sql

5. Setup MongoDB
cd mongodb
mongosh
> use projectSBD
> load("data.js")

6. Jalankan APi
cd ../api
python app.py