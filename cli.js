
var inquirer = require("inquirer"); 
var fs = require("fs");
var Card = require("./card.js");

var remainingGuesses = 2;
var count1 = 0;
var count2 = 0;
var deck1 = [];
var deck2 = [];

var card1 = new Card("\nWhat is 1? ", "it's 1");
deck1.push(card1);
var card2 = new Card("\nWhat is 2? ", "it's 2");
deck1.push(card2);
var card3 = new Card("\nWhat is 3? ", "it's 3");
deck1.push(card3);
var card4 = new Card("What is 4? ", "it's 4");
deck2.push(card4);
var card5 = new Card("What is 5? ", "it's 5");
deck2.push(card5);
var card6 = new Card("What is 6? ", "it's 6");
deck2.push(card6);

var start = function() {
	inquirer.prompt([{
    name: "command",
    message: "\nChose a Deck to Play",
    type: "list",
    choices: [{
        name: "State Capitals"
    }, {
        name: "State Abbreviations"
    }]
}]).then(function(answer) {
    if (answer.command === "State Capitals") {
        runDeck1();
    } else if (answer.command === "State Abbreviations") {
        runDeck2();
    }
});

};

var runDeck1 = function(){
	inquirer.prompt([{
	    name: "command",
	    message: "\nOpen new card or Exit",
	    type: "list",
	    choices: [{
	        name: "New Card"
	    }, {
	        name: "Exit"
	    }]
	}]).then(function(answer) {
	    if (answer.command === "New Card") {
	        openNew1();
	    } else if (answer.command === "Exit") {
	        exitApp();
	    }
	});
};


var openNew1 = function(){
	if (deck1.length > count1) {
		inquirer.prompt([{
		    name: "command",
		    message: deck1[count1].front,
		    type: "list",
		    choices: [{
		        name: "Answer"
		    }, {
		        name: "Flip"
		    }]
		}]).then(function(answer) {
		    if (answer.command === "Answer") {
		        answerNew1();
		    } else if (answer.command === "Flip") {
		        flip1();
		    }
		});
	} else {
		console.log("\nThe Deck is finished");
		start();
	}

};

var answerNew1 = function () {
	if (count1 < 3 ){
		inquirer.prompt([
			{
				type: "input",
				message: deck1[count1].front,
				name: "response"
			}
		]).then(function(answers) {
			if (answers.response === deck1[count1].back){
			console.log("\n");
			console.log("Correct!");
			console.log("\n");
			console.log("You Have " + remainingGuesses+ " remaining guesses.");
			}
			else {
				console.log("Incorrect!");
				remainingGuesses--;
				console.log("You Have " + remainingGuesses+ " remaining guesses.");
				if(remainingGuesses ===0){
					console.log("\n");
					console.log("Game Over.");
					console.log("\n");
					remainingGuesses = 2;
					count1 = 0;
					return start();
				}
			}
		count1++;
		runDeck1();
		});
	}
	else {
		console.log("end of deck 1");
		start();
	}	
};

var flip1 = function () {
	console.log(deck1[count1].back);
	count1++;
	openNew1();
};

var exitApp = function () {
	console.log("Thanks for playing! Goodbuy!");

	return
};

start();





 

