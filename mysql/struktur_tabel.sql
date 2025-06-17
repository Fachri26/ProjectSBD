REVOKE ALL PRIVILEGES ON projectSBD.* FROM 'root'@'localhost';

-- admin
CREATE USER 'adminuser'@'localhost' IDENTIFIED BY 'StrongPassword1!';
GRANT SELECT, INSERT, UPDATE, CREATE, ALTER, INDEX ON mydatabase.* TO 'adminuser'@'localhost';

-- backend
CREATE USER 'backenduser'@'localhost' IDENTIFIED BY 'StrongPassword2!';
GRANT SELECT, INSERT, UPDATE ON mydatabase.* TO 'backenduser'@'localhost';

-- Table: users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    isdeleted BOOL DEFAULT 0
);

-- Table: restaurants
CREATE TABLE restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address TEXT,
    category VARCHAR(50),
    isdeleted BOOL DEFAULT 0
);

-- Table: menus
CREATE TABLE menus (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    menu_name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    isdeleted BOOL DEFAULT 0,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

-- Table: orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    menu_id INT,
    quantity INT,
    order_time DATETIME,
    note TEXT,
    isdeleted BOOL DEFAULT 0
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
);

-- Table: payments
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    status VARCHAR(50),
    method VARCHAR(50),
    payment_time DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
