var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id: '+ connection.threadId);
	displayInv();
});

function displayInv() {
  connection.query("SELECT * FROM products", function(err, res) {
  	console.log('');
  	console.log('<<<<<Current Bamazon Inventory>>>>>')
  	console.log('');
    if (err) throw err;
    
    for (var i = 0; i < res.length; i++){
    	console.log('-------------------------------------------');
    	console.log('');
    	console.log(`Item Id: ${res[i].item_id}`);
    	console.log(`Product Name: ${res[i].product_name}`);
    	console.log(`Department Name: ${res[i].department_name}`);
    	console.log(`Price: $${res[i].price}`);
    	console.log(`Stock Quantity: ${res[i].stock_quantity}`);
    	console.log('');
    };
    customerPurchase();
	});
}

function customerPurchase(){
	var idnum;
	var idname;
	var reslen;
	var quant;
	var quantav;
	
	inquirer.prompt([
	{
		name:'id',
		type: 'input',
		message:'What is the Item Id of the product you would like to buy?',
		validate: function(value) {

			// Declare function as asynchronous, and save the done callback
		    var done = this.async();

			connection.query("SELECT product_name FROM products WHERE ?", {item_id: value}, function(err, res) {

				if (err) {
		        	done(`Got an error from mySql: ${err}`);
				}

				// If the response array is not empty
				// Then the query return a valid answer
				if (res.length != 0) {

					idnum = value;
		        	done(null, true);

				}

				done("Please pick a valid Item Id.");
			});
		}
	},
	{
		name:'quantity',
		type:'input',
		message: 'How many units of this product would you like to buy?',
		validate: function(value) {

			// Declare function as asynchronous, and save the done callback
		    var done = this.async();

			connection.query("SELECT stock_quantity FROM products WHERE ?",{item_id: idnum}, function(err, res) {

				if (err) {
		        	done(`Got an error from mySql: ${err}`);
				}

				// If the response array is not empty
				// Then the query return a valid answer
				if (res.length != 0) {

					quant = parseInt(value);
					quantav = res[0].stock_quantity;

					// console.log(quant);
					// console.log(quantav);

					if (quant >= 0 && quant <= quantav){	
						done(null, true);
					}

					done(`Bamazon does not have ${value} available units, please enter an valid amount.`);
				}

				done("The query returned a zero length response");
			});

		}
	}
	]).then(function(answer){
		console.log(answer);
	})
};