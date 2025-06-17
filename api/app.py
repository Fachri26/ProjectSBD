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

# GET order + tracking info
@app.route('/order_tracking/<int:order_id>', methods=['GET'])
def get_order_tracking(order_id):
    with mysql_conn.cursor() as cursor:
        cursor.execute("SELECT * FROM orders WHERE order_id = %s", (order_id,))
        order = cursor.fetchone()

    tracking = mongo_db.delivery_tracking.find_one({"order_id": order_id}, {"_id": 0})

    return jsonify({
        "order": order,
        "tracking": tracking
    })

# POST a new review
@app.route('/reviews', methods=['POST'])
def post_review():
    data = request.get_json()
    mongo_db.food_reviews.insert_one(data)
    return jsonify({"message": "Review added"}), 201

# GET search history by user_id
@app.route('/search/<int:user_id>', methods=['GET'])
def get_search_history(user_id):
    history = mongo_db.search_history.find_one({"user_id": user_id}, {"_id": 0})
    return jsonify(history)

# POST new order (MySQL)
@app.route('/order', methods=['POST'])
def add_order():
    data = request.get_json()
    with mysql_conn.cursor() as cursor:
        sql = """
        INSERT INTO orders (user_id, menu_id, quantity, order_time, note)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            data['user_id'], data['menu_id'], data['quantity'],
            data['order_time'], data.get('note', '')
        ))
        mysql_conn.commit()
        order_id = cursor.lastrowid
    return jsonify({"message": "Order placed", "order_id": order_id}), 201

if __name__ == '__main__':
    app.run(debug=True)
