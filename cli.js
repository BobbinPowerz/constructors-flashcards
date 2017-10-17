
var inquirer = require("inquirer"); 
var fs = require("fs");
var Card = require("./card.js");


var count1 = 0;
var count2 = 0;
var deck1 = [];
var deck2 = [];

var card1 = new Card("Question 1", "say1");
deck1.push(card1);
var card2 = new Card("Question 2", "say2");
deck1.push(card2);
var card3 = new Card("Question 3", "say3");
deck1.push(card3);
var card4 = new Card("Question 4", "say4");
deck2.push(card4);
var card5 = new Card("Question 5", "say5");
deck2.push(card5);
var card6 = new Card("Question 6", "say6");
deck2.push(card6);

inquirer.prompt([{
    name: "command",
    message: "Chose 1 for Deck 1. Chose 2 for Deck 2",
    type: "list",
    choices: [{
        name: "1"
    }, {
        name: "2"
    }]
}]).then(function(answer) {
    if (answer.command === "1") {
        askDeck1();
    } else if (answer.command === "2") {
        askDeck2();
    }
});

var askDeck1 = function(){
	if (count1 <= 3){
		inquirer.prompt([
		{
			type: "input",
			message: deck1[count1].front,
			name: "response"
		}
		]).then(function(answers) {
			if(answers.response === deck1[count1].back){
			console.log("Correct!");
		}
			else{
				console.log("Incorrect!");
			}
		count1++;
		askDeck1();
	});
}
} 

var askDeck2 = function(){
	if (count2 <= 3){
		inquirer.prompt([
		{
			type: "input",
			message: deck2[count2].front,
			name: "response"
		}
		]).then(function(answers) {
			if(answers.response === deck2[count2].back){
			console.log("Correct!");
		}
			else{
				console.log("Incorrect!");
			}
		count2++;
		askDeck2();
	});
}
} 
