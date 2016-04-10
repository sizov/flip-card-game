import Player from "./Player";
import Card from "./Card";


const DEFAULT_OPTIONS = {
  playersAmount: 2,
  cardsAmount: 10
};

function FlipCardGame(options) {
  options = options || {};
  options = Object.assign(DEFAULT_OPTIONS, options);

  const cards = generateCards(options.cardsAmount);
  const players = [];

  /**
   * Player who turns cards now
   */
  var currentPlayer;

  this.getCards = () => cards;
  this.getCurrentPlayer = () => currentPlayer;
  this.getPlayers = () => players;

  function generateCards(amount) {
    if (amount < 0) {
      throw new Error('Amount should not be less than zero');
    }

    var cards = [];
    for (var i = 0; i < amount; i++) {
      cards.push(new Card({
        id: i
      }));
    }

    return cards;
  }

}

export default FlipCardGame;
