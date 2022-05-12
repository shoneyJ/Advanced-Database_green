var readline = require('readline');
const api  = require('./app_queries.js');
const figlet  = require('figlet');
const chalk  = require('chalk');
var n = 0;

console.log(
  chalk.magentaBright(
    figlet.textSync("Stations locator", { horizontalLayout: 'full' })
  )
);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("1. Find nearest parcel stations near my location");
console.log("2. Find which parcel station delivers faster - Betting Result Prediction");


var recursiveAsyncReadLine = function () {
  rl.question("Enter your Choice of Use Case : ", function (answer) {
   switch (answer) {
      case '1':
            console.log(" BOB is in Main street. Find nearby parcel stations from Main street")
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++") 
            api.query3a();           
            break;
      case '2':
            api.query4();
            break;
      default:
          recursiveAsyncReadLine(); //Calling this function again to ask new question
      }
      if (answer == '0'){
         n = 1;
         process.exit()
      }
  });
};

recursiveAsyncReadLine(); 