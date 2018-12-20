DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50),
department_name VARCHAR(50),
price DECIMAL(10,2) NOT NULL,
stock_quantity INT,
PRIMARY KEY(id)
); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Christmas Tree', 'Home', 55.00, 300),
			   ('Stocking', 'Home', 12.95, 20),
               ('Gingerbread Cookie Mix', 'Baking', 2.95, 47),
               ('Santa Costume', 'Seasonal', 77.00, 42),
               ('Candy Canes', 'Baking', 3.75, 70),
               ('Wrapping Paper', 'Stationery', 7.85, 23),
               ('Bows', 'Stationery', 5.65, 80),
               ('String Lights' , 'Outdoor', 23.00, 82),
               ('Milk', 'Grocery', 1.95, 33),
               ('Candles', 'Home', 11.99, 100);
SELECT * FROM products;