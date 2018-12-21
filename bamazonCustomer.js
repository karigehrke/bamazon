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
        if (answer.action > 10) {
            console.log('This ID is invalid. Please enter a valid ID.')
        } else {
            var query = "SELECT id FROM products WHERE ?" 
            connection.query(query, {id: answer.action}, function(err, res) {   
            })
            runPurchase(); //runPurchase(product);
        }
        
    })
}

function runPurchase() { //function runPurchase(product) {
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
//subtract amounts in the query SET amount/reset database
.then(function(answer) {
    console.log(answer.amount);
    console.log(answer.product);

    if (answer.amount > 0) {
        var query = "SELECT id, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { id: answer.id, price: answer.price, stock_quantity: answer.stock_quantity}, function(err, res) { //answer.amount}) //{id: product.id} 
            var total = answer.amount * answer.price;
            console.log('Your total is: ' + total);    
        }) 
        
    if (answer.amount < answer.stock_quantity) {
        console.log("There is not enough in stock to fulfill your order.")
    }
    }
    
    connection.end();
})
}
// })
// }

//after purchase has been made
// connection.query()
// connection.end();