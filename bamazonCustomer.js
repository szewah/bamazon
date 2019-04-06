/**Module dependencies*/
let inquirer = require ('inquirer');
let colors = require('colors');
let connection = require ('./connection');
let prompts = require('./prompts');
let Table = require ('cli-table');

//start up the msyql connection
connection.connect(err => {
    if (err) throw err;
    console.log(`Connected at port: ${connection.threadId}`);
    showProducts();
});

//display the products that the user can buy
let showProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        let displayTable = new Table ({
            head: ["ID".bold.cyan, "Product Name".bold.cyan, "Category".bold.cyan, "Price".bold.cyan, "Stock".bold.cyan],
            colWidths: [5,46,15,9,9]
        });
        res.forEach(function(element) {
            displayTable.push([element.product_id, element.product_name, element.category,
            element.price, element.stock_quantity]);
        });
        console.log(displayTable.toString());
        purchasePrompt();
    });
};

//questions for user 
let purchasePrompt = () => {
    inquirer
        .prompt(prompts.purchasingPrompts)
        .then(answers => {
            let product_id = answers.product_id;
            let amountAsked = answers.amount;
            order(product_id, amountAsked);
        });
};

//run through the order
let order = (product_ID, amount) => {
    connection.query(`SELECT * FROM products WHERE product_id = ${product_ID}`, 
    (err, res) => {
        if (err) throw err;
        //check if there is enough inventory for the order to succeed
        if (amount <= res[0].stock_quantity) {
            let totalCost = res[0].price * amount;
            connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${amount} WHERE product_id = ${product_ID}`);
            console.log(`Your total cost for ${amount} ${res[0].product_name} is $${totalCost}. Thank you for shopping with us!`);
            connection.end();
        }
        //if there isn't enough stock for the order, let the user know
        else {
            console.log(`Sorry, we don't have enough of the ${res[0].product_name}s right now to complete the order`);
            purchasePrompt();
        }
    });
};

