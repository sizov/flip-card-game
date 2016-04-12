import gameStates from "./constants/gameStates";
import Player from "./Player";
import Card from "./Card";
import cardsGenerator from "./utils/cardsGenerator";
import playersGenerator from "./utils/playersGenerator";
import EventEmitter from 'wolfy87-eventemitter';

const DEFAULT_OPTIONS = {
    playersAmount: 2,
    cardsAmount: 10
};

function FlipCardGame(options) {
    options = options || {};
    options = Object.assign(DEFAULT_OPTIONS, options);

    const cards = cardsGenerator.generate(options.cardsAmount);
    const players = playersGenerator.generate(options.playersAmount);

    /**
     * State of the game - is it new game, in process or finished
     */
    var state = gameStates.NEW;

    /**
     * Player who turns cards now
     */
    var currentPlayer;

    const getPlayers = () => players;
    const getCards = () => cards;
    const getCurrentPlayer = () => currentPlayer;
    const getState = () => state;

    function flip(options) {
        var cardIdToFlip,
            playerId;

    }

    const eventEmitter = new EventEmitter();

    return Object.assign(
        {},
        {
            getState,
            getCards,
            getPlayers,
            getCurrentPlayer,
            flip
        },
        eventEmitter
    );

}

export default FlipCardGame;
