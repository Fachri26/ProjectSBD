INSERT INTO users (name, email, phone) VALUES
('Alice Johnson', 'alice.j@example.com', '081234567890'),
('Bob Smith', 'bob.smith@example.com', '089876543210');

INSERT INTO restaurants (name, address, category) VALUES
('Sate Nusantara', 'Jl. Merdeka No. 1, Jakarta', 'Indonesian'),
('Pizza Palace', 'Jl. Sudirman No. 88, Bandung', 'Italian');

INSERT INTO menus (restaurant_id, menu_name, description, price) VALUES
(1, 'Sate Ayam', 'Sate ayam dengan bumbu kacang khas', 25000.00),
(2, 'Margherita Pizza', 'Pizza klasik dengan keju dan saus tomat', 75000.00);

INSERT INTO orders (user_id, menu_id, quantity, order_time, note) VALUES
(1, 1, 2, '2025-06-14 12:30:00', 'Tanpa sambal'),
(2, 2, 1, '2025-06-14 13:00:00', 'Tambahkan keju ekstra');

INSERT INTO payments (order_id, status, method, payment_time) VALUES
(1, 'Paid', 'Gopay', '2025-06-14 12:35:00'),
(2, 'Pending', 'Credit Card', '2025-06-14 13:05:00');
