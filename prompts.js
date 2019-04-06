let purchasingPrompts = [
    {
        name: "product_id",
        type: "input",
        message: "Please enter the product ID you would like to buy:".cyan,
    },
    {
        name: "amount",
        type: "input",
        message: "How many would you like?".cyan,
    },    
    {
        name: "confirmation",
        type: "confirm",
        message: "Are you sure?".cyan,
    }
];

let selectPrompts = [
    {
        type: "list",
        name: "options",
        message: "Choose a view or manage inventory",
        choices: ["Products for Sale", "Low Inventory", 
        "Add to Inventory", "Add New Product" ]
    }
];

let inventoryPrompts = [
    {
        type: "input",
        name: "id",
        message: "What is the product ID you would like to restock?",
    },
    {
        type: "input",
        name: "quantity",
        message: "How much would you like to add?"
    }
];

let addProductPrompts = [
    {
        type: "input",
        name: "product",
        message: "What product would you like to add?"
    },
    {
        type: "list",
        name: "category",
        message: "Which category would you like to add it to?",
        choices: ["Accessories", "Beauty", "Children", "Cosmetics", "Electronics", "Groceries"]
    },
    {
        tpe: "input",
        name: "price",
        message: "Add price per piece:"
    },
    {
        type: "input",
        name: "stock",
        message: "Add quantity:"
    }
];

module.exports = {
    purchasingPrompts,
    selectPrompts,
    inventoryPrompts,
    addProductPrompts 
}