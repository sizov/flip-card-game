import gameStates from "./constants/gameStates";
import gameEvents from "../../src/game/constants/gameEvents";
import gameUtils from "../../src/game/utils/gameUtils";
import cardsGenerator from "./utils/cardsGenerator";
import playersGenerator from "./utils/playersGenerator";

import EventEmitter from 'wolfy87-eventemitter';

const DEFAULT_OPTIONS = {
    playersAmount: 2,
    cardsAmount: 10
};

//TODO: add events - move, game over
function FlipCardGame(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    const eventEmitter = new EventEmitter();
    this.on = eventEmitter.on.bind(eventEmitter);
    this.emit = eventEmitter.emit.bind(eventEmitter);

    /**
     * State of the game - is it new game, in process or finished
     */
    var state = gameStates.NEW;
    this.getState = () => state;

    /**
     * Player who turns cards now
     */
    var currentPlayer;
    this.getCurrentPlayer = () => currentPlayer;

    /**
     * Players that play the game
     */
    const players = playersGenerator.generate(options.playersAmount);
    const playersById = {};
    this.getPlayers = () => players;

    /**
     * All cards of the game
     */
    const cards = cardsGenerator.generate(options.cardsAmount);
    const cardsById = {};
    const cardsFlippedByPlayers = new Map();
    this.getCards = () => cards;

    /**
     * Method to make a move by player. This method changes the state of game by flipping a card.
     * @param options
     */
    this.flipCard = function (options) {
        options = options || {};

        const card = gameUtils.getCardToFlip({
            cardId: options.cardId,
            card: options.card,
            cardsById
        });
        const player = gameUtils.getPlayerToFlipCard({
            playerId: options.playerId,
            player: options.player,
            currentPlayer,
            playersById,
            cardsFlippedByPlayers
        });

        currentPlayer = player;
        card.flip();
        cardsFlippedByPlayers[player].push(card);

        eventEmitter.emit(gameEvents.FLIP, {
            card,
            player
        });
    };

    cards.forEach(function (card) {
        cardsById[card.getId()] = card;
    });

    players.forEach(function (player) {
        playersById[player.getId()] = player;
        cardsFlippedByPlayers[player] = [];
    });

}

export default FlipCardGame;
