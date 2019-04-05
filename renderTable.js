let Table = require ('cli-table');

//create a table to view data in the terminal
let renderTable = () => {
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

module.exports = { renderTable };