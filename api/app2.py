from flask import Flask, jsonify, request
from flask_cors import CORS
from db_config import mysql_conn, mongo_db

app = Flask(__name__)
CORS(app)

# GET all users
@app.route('/users', methods=['GET'])
def get_users():
    with mysql_conn.cursor() as cursor:
        cursor.execute("SELECT * FROM users")
        result = cursor.fetchall()
    return jsonify(result)

# GET all menus
@app.route('/menus', methods=['GET'])
def get_menus():
    with mysql_conn.cursor() as cursor:
        cursor.execute("SELECT * FROM menus")
        result = cursor.fetchall()
    return jsonify(result)

# GET reviews by menu_id
@app.route('/reviews/<int:menu_id>', methods=['GET'])
def get_reviews(menu_id):
    print(f"Received request for menu_id: {menu_id}")
    reviews = list(mongo_db.food_reviews.find({"menu_id": menu_id}, {"_id": 0}))
    print(f"Found reviews: {reviews}")
    return jsonify(reviews)

if __name__ == '__main__':
    app.run(debug=True)
