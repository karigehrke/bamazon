require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

//connection info for sql database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    //username
    user: "root",

    //password
    password: process.env.MYSQL_PASSWORD,
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showProducts();
});

// Working: Add table format.
function showProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var t = new Table

        res.forEach(function(products) {
            t.cell('Id', products.id)
            t.cell('Product Name', products.product_name)
            t.cell('Price', products.price)
            t.cell('Stock', products.stock_quantity)
            t.newRow();
        })
        console.log(t.toString());
        // console.log(res);
        start();
        // connection.end();
});  
};

//start function prompting user for what action they want to take
function start() {
    inquirer.prompt({
        name: "action",
        type: "input",
        message: "What is the ID of the product that you want to buy?"  
    })
    //validate the id number 
    .then(function(answer) {
        console.log(answer.action);
        // var query = "SELECT id FROM products WHERE ?"
        // connection.query(query, { id: answer.action}, function(err, res) {   
        // })
        runPurchase();
    })
}

function runPurchase() {
inquirer.prompt([
    {
        name: "amount",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }
])
.then(function(answer) {
    console.log(answer.amount)
    connection.end();
    // if (stock_quantity > 0) {
    // var query = "SELECT stock_quantity FROM products WHERE ?";
    // connection.query(query - answer.amount)
    // } else 
    // console.log("There is not enough in stock to fulfill your order.")
})
}

//after purchase has been made
// connection.query()
// connection.end();