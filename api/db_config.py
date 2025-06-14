import pymysql
from pymongo import MongoClient

# Koneksi MySQL
mysql_conn = pymysql.connect(
    host="localhost",
    user="backenduser",
    password="StrongPassword2!",
    database="mydatabase",
    cursorclass=pymysql.cursors.DictCursor
)

# Koneksi MongoDB
mongo_client = MongoClient("mongodb://customer:customer123@localhost:27017/food_delivery?authSource=food_delivery")
mongo_db = mongo_client["food_delivery"]