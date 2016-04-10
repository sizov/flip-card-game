import gameStates from "./gameStates";
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
     * State of the game - is it new game, in process or finished
     */
    var state = gameStates.NEW;

    /**
     * Player who turns cards now
     */
    var currentPlayer;

    this.getState = () => state;
    this.getCards = () => cards;
    this.getCurrentPlayer = () => currentPlayer;
    this.getPlayers = () => players;

    function generateCards(amount) {
        if (amount < 0) {
            throw new Error('Amount should not be less than zero');
        }

        var cards = [],
            pairId = 0;
        for (var i = 0; i < amount; i++) {
            cards.push(new Card({
                id: i,
                pairId: pairId
            }));
            if (pairId % 2 !== 0) {
                pairId = pairId + 1;
            }
        }

        return cards;
    }

}

export default FlipCardGame;
