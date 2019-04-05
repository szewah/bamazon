DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	product_id INT AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(20) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    stock_quantity SMALLINT NOT NULL,
    PRIMARY KEY (product_id)
);

INSERT INTO products (product_id, product_name, category, price, stock_quantity)
VALUES 
(product_id, 'Osprey Pack', 'Accessories', 180, 50),
(product_id, 'Green Toys Tea Set', 'Children', 16.12, 200),
(product_id, 'Winky Lux 24 KT Glimmer pH Balm', 'Cosmetics', 11.20, 500),
(product_id, '1Mii B06 Plus Bluetooth Receiver', 'Electronics', 20.22, 100),
(product_id, 'Digital Bathroom Scale', 'Electronics', 14.32, 400),
(product_id, 'Glad Tall Kitchen Drawstring Trash Bags', 'Groceries', 19.06, 1000),
(product_id, 'BALORAY Lunch Bag Tote Bag Lunch Bag', 'Accessories', 7.64, 200),
(product_id, 'Fisher-Price Harley-Davidson Tough Trike', 'Children', 40.98, 300),
(product_id, 'BS-MALL Makeup Brushes', 'Cosmetics', 10.99, 100),
(product_id, 'Mario Badescu Henna and Seamollient Shampoo', 'Beauty', 14, 600);

SELECT * FROM products








        
		
		