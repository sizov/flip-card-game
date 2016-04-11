import gameStates from "./gameStates";
import Player from "./Player";
import Card from "./Card";
import cardGenerator from "./utils/cardGenerator";
import EventEmitter from 'wolfy87-eventemitter';

const DEFAULT_OPTIONS = {
    playersAmount: 2,
    cardsAmount: 10
};

function FlipCardGame(options) {
    options = options || {};
    options = Object.assign(DEFAULT_OPTIONS, options);

    const cards = cardGenerator.generate(options.cardsAmount);
    const players = [];

    /**
     * State of the game - is it new game, in process or finished
     */
    var state = gameStates.NEW;

    /**
     * Player who turns cards now
     */
    var currentPlayer;

    function flip(options) {
        var cardIdToFlip,
            playerId;

    }

    const eventEmitter = new EventEmitter();

    return Object.assign(
        {},
        {
            get state() {
                return state;
            },
            get cards() {
                return cards;
            },
            get players() {
                return players;
            },
            get currentPlayer() {
                return currentPlayer;
            },
            flip
        },
        eventEmitter
    );

}

export default FlipCardGame;
