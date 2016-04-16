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
     * Pair of cards that is currently flipped by player
     */
    var currentFlippedPair = [];

    /**
     * Players that play the game
     */
    const players = options.players || playersGenerator.generate(options.playersAmount);
    this.getPlayers = () => players;

    /**
     * All cards of the game
     */
    const cards = options.cards || cardsGenerator.generate(options.cardsAmount);
    this.getCards = () => cards;

    const cardPairsFoundByPlayers = new Map();
    const cardsFlippedByPlayers = new Map();

    /**
     * Method to make a move by player.
     * This method changes the state of game by flipping a card.
     * @param options
     */
    this.flipCard = function (options) {
        options = options || {};

        const card = gameUtils.getCardToFlip({
            cardId: options.cardId,
            card: options.card,
            cards
        });


        const player = gameUtils.getPlayerToFlipCard({
            playerId: options.playerId,
            player: options.player,
            currentPlayer,
            players,
            cardsFlippedByPlayers
        });

        currentPlayer = player;

        card.flip();

        currentFlippedPair.push(card);

        if (currentFlippedPair.length === 2) {
            if (currentFlippedPair[0].getPairId() === currentFlippedPair[1].getPairId()) {
                eventEmitter.emit(
                    gameEvents.PLAYER_FOUND_PAIR_EVENT,
                    {cards: currentFlippedPair, player}
                );
            }
            else {
                //we need to flip back cards if pair has not been found
                currentFlippedPair[0].flip();
                currentFlippedPair[1].flip();
            }

            eventEmitter.emit(
                gameEvents.PLAYER_FINISHED_FLIPPING_PAIR_EVENT,
                {cards: currentFlippedPair, player}
            );
            currentFlippedPair = [];
            currentPlayer = undefined;
        }

        cardsFlippedByPlayers.get(player).push(card);
        //cardPairsFoundByPlayers.get(player).push(card);

        eventEmitter.emit(gameEvents.CARD_FLIP_EVENT, {card, player});

        //TODO: if it's player second card, check if it's pair, if yes - move them to play count otherwise, flip back
        var currentGameState = gameUtils.getGameState(
            {cards, cardsFlippedByPlayers, cardPairsFoundByPlayers}
        );
        if (currentGameState === gameStates.OVER) {
            eventEmitter.emit(gameEvents.GAME_OVER_EVENT, {
                winnerPlayer: gameUtils.getWinningPlayer({players})
            });
        }

        else if (currentGameState === gameStates.DRAW) {
            eventEmitter.emit(gameEvents.GAME_DRAW_EVENT);
        }
    };

    players.forEach(function (player) {
        cardPairsFoundByPlayers.set(player, []);
        cardsFlippedByPlayers.set(player, []);
    });

}

export default FlipCardGame;
