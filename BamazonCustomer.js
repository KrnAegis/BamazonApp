var inquirer = require("inquirer");
var mysql = require("mysql");
//establish connection with MySQL
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,


  user: "root",


  password: "password",
  database: "bamazon"
});
//make sure server is connected and start the start function
connection.connect(function(err) {
  if (err) throw err;
  start();
});


//start function
function start() {
	//pulling data from MySQL product table and display them
	connection.query("SELECT * FROM products", function(err, results) {
		//id, prod_name, department, price, quantity
            for (var i = 0; i < results.length; i++) {
            	console.log("----------------------------------")
				console.log("Item ID: " + results[i].id);
				console.log("Product name: " + results[i].prod_name);
				console.log("Category: " + results[i].department);
				console.log("Price: $" + results[i].price);
				console.log("Quantity left: " + results[i].quantity);
            }
            //after list is created, prompt users with input questions
			inquirer.prompt([
				{
			      type: "input",
			      message: "Please state the id of the product you want",
			      name: "id"	
				},
				{
			      type: "input",
			      message: "How many would you like?",
			      name: "quantity"	
				}
				]).then(function(resp) {
					//console logging picked item info
					var id = parseInt(resp.id)
					//checking if the picked items are in stock
					if (results[id-1].quantity >= resp.quantity ){
					console.log("You've selected :" + results[id-1].prod_name)
					console.log("There are currently " + results[id-1].quantity + " left, and you ordered " + resp.quantity)
					//calculating changed quantity for an item
					var newQuan = results[id-1].quantity - resp.quantity;
					//updating the picked item quantity into MySQL
					connection.query(
			            "UPDATE products SET ? WHERE ?",
			            [
			              {
			                quantity: newQuan 
			              },
			              {
			                id: results[id-1].id
			              }
			            ])
					//calculate and display total amount user needs to pay
					console.log("the total is $" + results[id-1].price * resp.quantity)
					additionalOrder();
					//if picked item doesnt have any quantity or meet the requested quantity
					} else {
						console.log("I'm sorry, we don't have enough quantity for that item")
						additionalOrder();
					}
				})
	})
}
//function to continue shopping if user wants to or not
function additionalOrder(){
	inquirer.prompt([
	{
		type: "input",
		message: "Would you like to order more? (yes/no)",
		name: "order"
	}]).then(function(resp){
		if (resp.order === "yes"){
			start();
		} else {
			console.log("Thank you! See you soon!")
		}
	})
}