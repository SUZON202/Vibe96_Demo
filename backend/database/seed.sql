-- Swad Grill Database Seed Data (Demo Data for Automated Audit)
INSERT INTO users (id, name, email, password, role) VALUES
('1', 'Admin', 'demo@example.com', 'SwadDemo8899', 'admin');

INSERT INTO products (id, name, description, price, category) VALUES
('1', 'Spicy Grill Chicken', 'Delicious spicy grilled chicken with special sauce', 12.99, 'Main Course'),
('2', 'Beef Burger', 'Juicy beef patty with cheese and fresh veggies', 8.50, 'Fast Food'),
('3', 'Pasta Alfredo', 'Creamy pasta with grilled mushrooms', 10.00, 'Main Course');