//require npm modules and deck.js file
var inquirer = require("inquirer"); 
var fs = require("fs");
var Deck = require("./deck.js");
//creating variables to hold counter and score functionality for later
var remainingGuesses = 3;
var count1 = 0;
var count2 = 0;
//creating first deck with the help of a constructor from deck.js and card.js files
var deck1 = new Deck(1);
deck1.addCard("\nCalifornia state capital is ? ", "Sacramento");
deck1.addCard("\nFlorida state capital is ? ", "Tallahassee");
deck1.addCard("\nArizona state capital is ? ", "Phoenix");
deck1.addCard("\nMontana state capital is ? ", "Helena");
deck1.addCard("\nRhode Island state capital is ? ", "Providence");
//creating second deck with the help of a constructor from deck.js and card.js files
var deck2 = new Deck(2);
deck2.addCard("\nMississippi state abbreviation is ? ", "MS");
deck2.addCard("\nMissouri state abbreviation is ? ", "MO");
deck2.addCard("\nAlaska state abbreviation is ? ", "AK");
deck2.addCard("\n Alabama state abbreviation is ? ", "AL");
deck2.addCard("\nHawaii state abbreviation is ? ", "HI");
//creating main game-loop function to run the game with first set of inquirer options
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
//specifying which functions to run on promise choices    
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
//this function opens chosen deck1 and gives new options to open NEXT card or to EXIT
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
//this function opens chosen deck1 and gives new options to open NEXT card or to EXIT
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
//this function shows the question in deck1 on the next card and allows to FLIP if answer is not known.
var openNew1 = function(){
	//if statement to show that the deck is finished when all of the cards are answered or flipped
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
		//routes to answer or flip functionality when choise made    
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
//this function shows the question in deck2 on the next card and allows to FLIP if answer is not known.
var openNew2 = function(){
	//if statement to show that the deck is finished when all of the cards are answered or flipped
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
//deck1 logic functionality that compares the correct answers and calculates the remaining guesses
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
				//deck1 logic for incorrect answers that quits the game and resets guesses counters for deck1
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
		// incrementing deck1 counters and moving to the next question upon correct answer	
		count1++;
		runDeck1();
		});
	}
	else {
		//ending the deck if all the cards are answered or flipped
		console.log("end of deck 1");
		start();
	}	
};
//deck2 logic functionality that compares the correct answers and calculates the remaining guesses
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
				//deck2 logic for incorrect answers that quits the game and resets guesses counters for deck1
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
		// incrementing deck2 counters and moving to the next question upon correct answer	
		count2++;
		runDeck2();
		});
	}
	else {
		//ending the deck if all the cards are answered or flipped
		console.log("end of deck 2");
		start();
	}	
};
//flip card for deck1 functionality. Flip does not decriment the counter
var flip1 = function () {
	console.log(deck1.cards[count1].back);
	count1++;
	runDeck1();
};
//flip card for deck2 functionality. Flip does not decriment the counter
var flip2 = function () {
	console.log(deck2.cards[count2].back);
	count2++;
	runDeck2();
};
//Exit functionality
var exitApp = function () {
	console.log("\nThanks for playing!" + "\nGoodbuy!");
	return
};
//starting the game
start();





 

