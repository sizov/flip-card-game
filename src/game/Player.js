import Card from './Card.js';

function Player() {
  var pairedCards = [];

  this.addPair = function (card1, card2) {
    pairedCards.push([card1, card2]);
  };

  this.getParedCards = () => pairedCards;
}

export default Player;
