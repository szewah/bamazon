/**Module dependencies*/
let inquirer = require ('inquirer');
let colors = require('colors');
let connection = require ('./connection');
let prompts = require('./prompts');

//start up the msyql connection
connection.connect(err => {
    if (err) throw err;
    console.log(`Connected at port: ${connection.threadId}`);
    selectOption();
});

//create a table to view data in the terminal
let renderTable = (res) => {
    let displayTable = new Table ({
        head: ["ID".bold.cyan, "Product Name".bold.cyan, "Category".bold.cyan, 
        "Price".bold.cyan, "Stock".bold.cyan],
        colWidths: [5,46,15,9,9]
    });
    res.forEach(function(element) {
        displayTable.push([element.product_id, element.product_name, 
        element.category,element.price, element.stock_quantity]);
    });
    console.log(displayTable.toString());
};

//trigger the options and run the program
let selectOption = () => {
    inquirer
    .prompt(prompts.selectPrompts)
    .then(answer => {
        switch(answer.options) {
            case "Products for Sale":
            productsSaleView();
            break;
            case "Low Inventory":
            lowInventoryView();
            break;
            case "Add to Inventory":
            addInventory();
            break;
            case "Add New Product":
            addProduct();
            break;
            default:
            selectOption();
        };
    })
};

//view all products call
let productsSaleView = () => {
    connection.query(`SELECT * FROM products`, (err, res) => {
        if (err) throw err;
        renderTable(res);
    })
};

//view low inventory products call
let lowInventoryView = () => {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 10`, (err, res) => {
        if (err) throw err;
        renderTable(res);
    });
};

//add to the inventory
let addInventory = () => {
    inquirer
    .prompt(prompts.inventoryPrompts)
    .then(answer => {
        let id = answer.id;
        let quantity = answer.quantity;

        connection.query(`UPDATE products SET stock_quantity = stock_quantity + 
        ${quantity} WHERE product_id = ${id}`);
        if (quantity > 1) {
            console.log(`${quantity} pieces were added to your stock`)
        } else {
            console.log(`${quantity} piece was added to your stock.`)
        }
    });
}; 

//add a new product
let addProduct = () => {
    inquirer
    .prompt(prompts.addProductPrompts)
    .then(answers => {
        let product_name = answers.product;
        let category = answers.category;
        let price = answers.price;
        let quantity = answers.stock;

        connection.query(`INSERT INTO products (product_name, category, price, stock_quantity) 
        VALUES ('${product_name}', '${category}', '${price}', '${quantity}')`);
        console.log(`You added ${product_name}, ${category}, ${price}, ${quantity} 
        to the database.`)
    });
};


