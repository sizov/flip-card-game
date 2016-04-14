import gameStates from "./constants/gameStates";
import cardStates from "./constants/cardStates";
import Player from "./Player";
import Card from "./Card";
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

    /**
     * State of the game - is it new game, in process or finished
     */
    var state = gameStates.NEW;
    const getState = () => state;

    /**
     * Player who turns cards now
     */
    var currentPlayer;
    const getCurrentPlayer = () => currentPlayer;

    /**
     * Players that play the game
     */
    const players = playersGenerator.generate(options.playersAmount);
    const getPlayers = () => players;

    const cards = cardsGenerator.generate(options.cardsAmount);
    const getCards = () => cards;

    const cardsById = {};
    const playersById = {};
    const cardsFlippedByPlayers = new Map();

    cards.forEach(function (card) {
        cardsById[card.getId()] = card;
    });

    players.forEach(function (player) {
        playersById[player.getId()] = player;
        cardsFlippedByPlayers[player] = [];
    });

    /**
     * Gets next valid player for the move
     */
    function getNextValidPlayer(cardsFlippedByPlayer) {

    }

    function getPlayer(options) {
        options = options || {};

        if (options.player) {
            const player = playersById[options.player.getId()];
            if (typeof player === 'undefined') {
                throw new Error('Provided player is not known');
            }
            return player;
        }

        if (options.playerId) {
            const player = playersById[options.playerId];
            if (typeof player === 'undefined') {
                throw new Error('Provided player ID is not known');
            }
            return player;
        }

        return getNextValidPlayer();
    }

    function getCard(options) {
        options = options || {};

        if (options.card) {
            const card = cardsById[options.card.getId()];
            if (typeof card === 'undefined') {
                throw new Error('Provided card is not known');
            }
            return card;
        }

        if (options.cardId) {
            const card = cardsById[options.cardId];
            if (typeof card === 'undefined') {
                throw new Error('Provided card ID is not known');
            }
            return card;
        }
    }

    /**
     * Checks if this player can move now
     * @param player
     */
    function isValidPlayerToDoFlip(player, cardsFlippedByPlayer) {
        //TODO: make sure that this player has not flipped more than 2 cards than others players
        return true;
    }

    /**
     * Method to make a move by player. This method changes the state of game by flipping a card.
     * @param options
     */
    function flipCard(options) {
        options = options || {};

        const card = getCard(options);
        if (card.getState() === cardStates.FACE) {
            throw new Error(`Error flipping card ${card.getId()} as it is flipped already`);
        }

        const player = getPlayer(options);
        if (!isValidPlayerToDoFlip(player, cardsFlippedByPlayers)) {
            throw new Error(`Player ${player.getId()} can't flip cards now`);
        }

        currentPlayer = player;
        card.flip();
        cardsFlippedByPlayers[player].push(card);

        //TODO: control the amount of moves - only two moves per player
    }

    const eventEmitter = new EventEmitter();

    return Object.assign(
        Object.create(eventEmitter),//TODO: consider doing proper prototype inheritence
        {
            getState,
            getCards,
            getPlayers,
            getCurrentPlayer,
            flipCard
        }
    );

}

export default FlipCardGame;
