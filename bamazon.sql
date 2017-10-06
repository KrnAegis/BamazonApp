CREATE DATABASE bamazon;
use bamazon;

create table products(
id int(10) auto_increment not null,
prod_name varchar(30) not null,
department varchar(30) not null,
price int(5) not null,
quantity int(5) not null
primary key(id)
)

INSERT INTO products (prod_name, department, price, quantity) values ("Plaid-shirts", "Clothing", 15, 50);
INSERT INTO products (prod_name, department, price, quantity) values ("Denims", "Clothing", 20, 30);
INSERT INTO products (prod_name, department, price, quantity) values ("Jackets", "Clothing", 35, 25);
INSERT INTO products (prod_name, department, price, quantity) values ("Underwear", "Clothing", 7, 60);
INSERT INTO products (prod_name, department, price, quantity) values ("T-shirts", "Clothing", 5, 100);

INSERT INTO products (prod_name, department, price, quantity) values ("Bamazon-Wind", "Electronics", 68, 70);
INSERT INTO products (prod_name, department, price, quantity) values ("Wireless Headphone", "Electronics", 55, 45);
INSERT INTO products (prod_name, department, price, quantity) values ("Universal Charger", "Electronics", 20, 36);
INSERT INTO products (prod_name, department, price, quantity) values ("Portal Gun", "Electronics", 4000, 2);
INSERT INTO products (prod_name, department, price, quantity) values ("Tera-former", "Electronics", 8000, 1);