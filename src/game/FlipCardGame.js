function FlipCardGame() {
  var cards = [];
  var players = [];

  /**
   * Player who turns cards now.
   */
  var currentPlayer;

  this.getCards = () => cards;
  this.getCurrentPlayer = () => currentPlayer;
  this.getPlayers = () => players;
}

export default FlipCardGame;
