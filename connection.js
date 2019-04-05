let msyql = require("mysql");

let connection = msyql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: "bamazon",
});

module.exports = connection;

