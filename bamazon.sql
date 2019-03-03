USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Underwear (Black)", "Men's Clothing", 24.99, 100),
("Protein Drink (Single)", "Beverages", 4.99, 50),
("Hard-Boiled Eggs (2)", "Food", 1.99, 200),
("Chili Cheese Fritos (9.75 oz)", "Men's Clothing", 3.79, 70),
("Apple Airpods", "Electronics", 159.00, 5),
("Nutri-Grain bars (8)", "Food", 3.49, 30),
("Gym Duffel Bag (Black)", "Luggage", 23.99, 3),
("Suavecito Pomade", "Bath & Beauty", 11.99, 10),
("Smartwater, Sparlking (1L)", "Beverages", 1.99, 32),
("Bannanas (3 lbs)", "Food", 1.49, 12);

SELECT * FROM products;