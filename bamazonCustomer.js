var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  inventory();
});

///////////////////////////////Inventory///////////////////////////////

function inventory() {

    var table = new Table({
        head: ['ID'.yellow.bold, 'Item'.yellow.bold, 'Department'.yellow.bold, 'Price'.yellow.bold, 'Stock'.yellow.bold],
        colWidths: [5, 40, 20, 8, 8]
    });

    listInventory();

    function listInventory() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            console.log("");
            console.log("***************** WELCOME TO BMAZON! * HERE'S OUR CURRENT INVENTORY ******************".yellow.bold);
            console.log(table.toString());
            console.log("");
            selectionPrompt();
        });
    }
};

/////////////////////////////////Item selection/Quantity///////////////////////////////

function selectionPrompt() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Enter the ID number of the item you would like to purchase:".yellow,
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many units of this item would you like to purchase?".yellow,

        }
    ]).then(function(userPurchase) {

    connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {

                    console.log("****************************");
                    console.log("Insufficient Quantity!");
                    console.log("****************************");
                    inventory();

                } else {
                    console.log("");
                    console.log("YOUR PURCHASE");
                    console.log("****************************");
                    console.log("Item: " + res[i].product_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + userPurchase.inputNumber);
                    console.log("Total: " + res[i].price * userPurchase.inputNumber);
                    console.log("****************************");

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    // console.log(newStock);
                    updateStock(newStock, purchaseId);
                }
            }
        });
    });
}
/////////////////////////////////Update Inventory///////////////////////////////

function updateStock(newStock, purchaseId) {

    connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});
            inventory();
};
