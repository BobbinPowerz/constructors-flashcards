
var Card = require('./card.js');
var Deck = function(name){
    this.name = name;
    this.cards = [];

    this.addCard = function(front, back) {
    this.cards.push(new Card(front, back));
    return this.cards.length;
  };
};

module.exports = Deck;