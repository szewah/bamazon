/**Module dependencies*/
let inquirer = require ('inquirer');
let connection = require ('./connection');
let prompts = require('./prompts');
let Table = require ('cli-table');
let colors = require('colors');

//table format
function productsView(res) {
    let table = new Table ({
        head: ["ID","Product Name", "Category", "Price", "Stock"],
        colWidths: [5,15,15,9,9]
    });
    res.forEach(({ product_id, product_name, category, price, stock_quantity }) => {
        table.push([
          product_id,
          product_name,
          category,
          price,
          stock_quantity
        ]);
      });
      console.log(table.toString());
};

colWidths:[5,15,15,9,9]


//start up the msyql connection
connection.connect(err => {
    if (err) throw err;
    console.log(`Connected at port: ${connection.threadId}`);
    selectOption();
});

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
        productsView(res);
        selectOption();
    });
};

//view low inventory products call
let lowInventoryView = () => {
    connection.query(`SELECT * FROM products WHERE stock_quantity < 10`, (err, res) => {
        if (err) throw err;
        productsView(res);
        selectOption();
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
        console.log(`${quantity} pieces were added to your Product ID ${id}`.red)
        console.log("Yay added");
        selectOption();
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
        console.log(`You added ${product_name}, ${category}, ${price}, ${quantity} to the database.`.red);
        selectOption();
    });
};


