let inquirer = require("inquirer");
let connection = require("./connection");
let Table = require("cli-table");
let colors = require("colors");

connection.connect(err => {
    if (err) throw err;
    console.log(`Connected at port: ${connection.threadId}`);
});

let viewQuery = () => {
    inquirer
    .prompt([
        {
            type: "list",
            name: "viewList",
            message: "What would you like to do?",
            choices: ["View products for sale", "Set up a new department", "Exit"]
        }
    ]).then(answer => {
        switch(answer.viewList) {
            case "View products for sale":
                showTable();
                break;
            case "Set up a new department":
                createDept();
                break;
            case "Exit":
                console.log("See you later.")
                connection.end();
                break;
        };
    }); 
};

viewQuery();

let showTable = () => {
    let query = `SELECT dept_id, dept_name, over_head_costs, SUM(products.product_sales) AS sales, 
    SUM(products.product_sales) - over_head_costs AS profit FROM departments INNER JOIN products 
    ON products.category = departments.dept_name GROUP BY dept_id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(res);
        let deptTable = new Table ({
            head: ["ID".bold.cyan,"Department".bold.cyan, "Overheads".bold.cyan, "Sales".bold.cyan, "Profit".bold.cyan],
            colWidths: [5,15,15,15,15]
        });
        res.forEach(({dept_id,dept_name,over_head_costs, sales, profit}) => {
            deptTable.push([dept_id,dept_name,over_head_costs, sales, profit]);
        });
        console.log(deptTable.toString());
        viewQuery();
        // // // connection.end();
    });
};

let createDept = () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newDept",
            message: "What would you like to call it?",
        },
        {
            type: "input",
            name: "overheads",
            message: "What are the overhead costs?"
        }
    ])
    .then(answer => {
        let name = answer.newDept;
        let overHeadCosts = answer.overheads;
        console.log(name, overHeadCosts);
        connection.query(`INSERT INTO departments (dept_id, dept_name, over_head_costs) 
        VALUES (dept_id, '${name}', '${overHeadCosts}')`);
        console.log("Department successfully added.");
        viewQuery();
        });
};




