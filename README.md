# bamazon
Amazon-like storefront CLI app

## Description

This CLI application is a basic storefront with a MySQL database using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the npm [mysql](https://www.npmjs.com/package/mysql) package. 

## Customer Interface

The customer interface allows the user to view the current inventory of store items: ID, description, department and price. The user is then able to purchase one of the items by entering the item ID and the quantity. If the  quantity of the item is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the quantity of the item is not available, the user is prompted.

![Bmazon Purchase](/Bmazon_purchase.png)

![Insufficient Quantity](/Insufficient_quantity.png)
