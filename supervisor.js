let connection = require ("./connection");
let Table = require ('cli-table');
let table = new Table ({
    head: ["ID","Product Name", "Category", "Price", "Stock"],
    colWidths: [5,15,15,9,9]
});

connection.connect(err => {
    if (err) throw err;
    console.log(`Connected at port: ${connection.threadId}`);
});



