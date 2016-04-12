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
    const cardsFlippedByPlayer = new Map();

    cards.forEach(function (card) {
        cardsById[card.getId()] = card;
    });

    players.forEach(function (player) {
        playersById[player.getId()] = player;
        cardsFlippedByPlayer[player] = [];
    });

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

        //TODO: get next possible player if one is not provided
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
     * Method to make a move by player. This method changes the state of game by flipping a card.
     * @param options
     */
    function flipCard(options) {
        options = options || {};

        const card = getCard(options);
        const player = getPlayer(options);

        if (!card) {
            throw new Error('Error finding target card');
        }

        if (!player) {
            throw new Error('Error finding target player');
        }

        if (card.getState() === cardStates.FACE) {
            throw new Error(`Error flipping card ${card.id} as it is flipped already`);
        }

        currentPlayer = player;
        card.flip();
        cardsFlippedByPlayer[player].push(card);

        //TODO: control the amount of moves - only two moves per player
    }

    const eventEmitter = new EventEmitter();

    return Object.assign(
        {},
        {
            getState,
            getCards,
            getPlayers,
            getCurrentPlayer,
            flipCard
        },
        eventEmitter
    );

}

export default FlipCardGame;
