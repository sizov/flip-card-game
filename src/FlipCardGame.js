import gameStates from "./constants/gameStates";
import gameEvents from "./constants/gameEvents";
import gameUtils from "./utils/gameUtils";
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
    //TODO: can we make this as getter on utils calculation function?
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
    this.getPlayers = () => players;


    /**
     * All cards of the game
     */
    const cards = cardsGenerator.generate(options.cardsAmount);
    this.getCards = () => cards;

    const cardsById = new Map();
    const cardPairsFoundByPlayers = new Map();
    const cardsFlippedByPlayers = new Map();
    const playersById = new Map();

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
            cardPairsFoundByPlayers
        });

        currentPlayer = player;
        card.flip();

        cardsFlippedByPlayers.get(player).push(card);

        //TODO: dispatch event if pair found
        if (true) {
            cardPairsFoundByPlayers.get(player).push(card);
        }

        eventEmitter.emit(gameEvents.CARD_FLIP_EVENT, {card, player});

        //TODO: if it's player second card, check if it's pair, if yes - move them to play count otherwise, flip back
        var currentGameState = gameUtils.getGameState({cards, cardsFlippedByPlayers, cardPairsFoundByPlayers});
        if (currentGameState === gameStates.OVER) {
            eventEmitter.emit(gameEvents.GAME_OVER_EVENT, {
                winnerPlayer: gameUtils.getWinningPlayer({players})
            });
        }

        else if (currentGameState === gameStates.DRAW) {
            eventEmitter.emit(gameEvents.GAME_DRAW_EVENT);
        }
    };

    cards.forEach(function (card) {
        cardsById.set(card.getId(), card);
    });

    players.forEach(function (player) {
        playersById.set(player.getId(), player);
        cardPairsFoundByPlayers.set(player, []);
        cardsFlippedByPlayers.set(player, []);
    });

}

export default FlipCardGame;
