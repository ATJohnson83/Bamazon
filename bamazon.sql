CREATE database bamazon;
USE	bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER (11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price,	stock_quantity)
VALUES ('Sony Headphones', 'Electronics', 15.50,100),
			 ('Record Player', 'Electronics',75.55,145),
			 ('Knower Record', 'Music',19.99,250),
			 ('FORQ CD', 'Music',20.25,75),
			 ('p90x Bands', 'Fitness', 25.99,300),
			 ('p90x Pullup Bar', 'Fitness',45.49,265),
			 ('French Press', 'Kitchen',25.99,400),
			 ('VitaMix', 'Kitchen', 349.99, 1500),
			 ('Roland Piano','Musical Instruments',1800.99,35),
			 ('Viscount Legend','Musical Instruments',2499.00,26);

