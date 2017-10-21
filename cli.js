
var inquirer = require("inquirer"); 
var fs = require("fs");
var Deck = require("./deck.js");

var remainingGuesses = 3;
var count1 = 0;
var count2 = 0;

var deck1 = new Deck(1);
deck1.addCard("\nCalifornia state capital is ? ", "Sacramento");
deck1.addCard("\nFlorida state capital is ? ", "Tallahassee");
deck1.addCard("\nArizona state capital is ? ", "Phoenix");
deck1.addCard("\nMontana state capital is ? ", "Helena");
deck1.addCard("\nRhode Island state capital is ? ", "Providence");

var deck2 = new Deck(2);
deck2.addCard("\nMississippi state abbreviation is ? ", "MS");
deck2.addCard("\nMissouri state abbreviation is ? ", "MO");
deck2.addCard("\nAlaska state abbreviation is ? ", "AK");
deck2.addCard("\n Alabama state abbreviation is ? ", "AL");
deck2.addCard("\nHawaii state abbreviation is ? ", "HI");

var start = function() {
	inquirer.prompt([{
    name: "command",
    message: "\nChose a Deck or Exit",
    type: "list",
    choices: [{
        name: "State Capitals"
    }, {
        name: "State Abbreviations"
    }, {
        name: "Exit"
    }]
}]).then(function(answer) {
    if (answer.command === "State Capitals") {
        runDeck1();
    } else if (answer.command === "State Abbreviations") {
        runDeck2();
    } else if (answer.command === "Exit") {
        exitApp();
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

var runDeck2 = function(){
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
	        openNew2();
	    } else if (answer.command === "Exit") {
	        exitApp();
	    }
	});
};

var openNew1 = function(){
	if (deck1.cards.length > count1) {
		inquirer.prompt([{
		    name: "command",
		    message: deck1.cards[count1].front,
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

var openNew2 = function(){
	if (deck2.cards.length > count2) {
		inquirer.prompt([{
		    name: "command",
		    message: deck2.cards[count2].front,
		    type: "list",
		    choices: [{
		        name: "Answer"
		    }, {
		        name: "Flip"
		    }]
		}]).then(function(answer) {
		    if (answer.command === "Answer") {
		        answerNew2();
		    } else if (answer.command === "Flip") {
		        flip2();
		    }
		});
	} else {
		console.log("\nThe Deck is finished");
		start();
	}
};

var answerNew1 = function () {
	if (count1 < 5 ){
		inquirer.prompt([
			{
				type: "input",
				message: deck1.cards[count1].front,
				name: "response"
			}
		]).then(function(answers) {
			if (answers.response === deck1.cards[count1].back){
			console.log("\n");
			console.log("Correct!");
			console.log("You Have " + remainingGuesses+ " remaining guesses.");
			}
			else {
				console.log("\n");
				console.log("Incorrect!");
				remainingGuesses--;
				console.log("You Have " + remainingGuesses+ " remaining guesses.");
				if(remainingGuesses ===0){
					console.log("\n");
					console.log("Game Over.");
					console.log("\n");
					remainingGuesses = 3;
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

var answerNew2 = function () {
	if (count2 < 5 ){
		inquirer.prompt([
			{
				type: "input",
				message: deck2.cards[count2].front,
				name: "response"
			}
		]).then(function(answers) {
			if (answers.response === deck2.cards[count2].back){
			console.log("\n");
			console.log("Correct!");
			console.log("You Have " + remainingGuesses + " remaining guesses.");
			}
			else {
				console.log("\n");
				console.log("Incorrect!");
				remainingGuesses--;
				console.log("You Have " + remainingGuesses + " remaining guesses.");
				if(remainingGuesses ===0){
					console.log("\n");
					console.log("Game Over.");
					console.log("\n");
					remainingGuesses = 3;
					count2 = 0;
					return start();
				}
			}
		count2++;
		runDeck2();
		});
	}
	else {
		console.log("end of deck 2");
		start();
	}	
};

var flip1 = function () {
	console.log(deck1.cards[count1].back);
	count1++;
	runDeck1();
};

var flip2 = function () {
	console.log(deck2.cards[count2].back);
	count2++;
	runDeck2();
};

var exitApp = function () {
	console.log("\nThanks for playing!" + "\nGoodbuy!");
	return
};

start();





 

