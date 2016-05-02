import gameStates from "./constants/gameStates";
import gameEvents from "./constants/gameEvents";
import gameUtils from "./utils/gameUtils";
import cardsGenerator from "./utils/cardsGenerator";
import playersGenerator from "./utils/playersGenerator";

//TODO: add error event ?

import EventEmitter from 'wolfy87-eventemitter';

const DEFAULT_OPTIONS = {
    playersAmount: 2,
    cardsAmount: 10
};

function FlipCardGame(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    const eventEmitter = new EventEmitter();
    this.on = eventEmitter.on.bind(eventEmitter);
    this.emit = eventEmitter.emit.bind(eventEmitter);

    /**
     * State of the game - is it new game, in process or finished
     */
    this.getState = () => gameUtils.getGameState(
        {cards, cardsFlippedByPlayers, pairsFoundByPlayers, currentPlayer}
    );

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

    const pairsFoundByPlayers = new Map();
    const cardsFlippedByPlayers = new Map();

    function emitPossibleGameEndEvent(gameState) {
        if (gameState.state === gameStates.OVER) {
            eventEmitter.emit(gameEvents.GAME_OVER_EVENT, {
                winner: gameState.winners[0]
            });
        }
        else if (gameState.state === gameStates.DRAW) {
            eventEmitter.emit(gameEvents.GAME_DRAW_EVENT, {
                winners: gameState.winners
            });
        }
    }

    /**
     * Method to make a move by player.
     * This method changes the state of game by flipping a card.
     *
     * @param options Options object
     * @param options.player Player (instance) who makes current move
     * @param options.playerId Alternative to passing Player instance -
     * you can pass ID of Player instance
     * @param options.card Card (instance) which passed player wants to flip
     * @param options.cardId Alternative to passing Card instance) -
     * you can pass ID of Card instance
     */
    this.flipCard = function (options) {
        options = options || {};

        const card = gameUtils.getCardToFlip({
            cardId: options.cardId,
            card: options.card,
            cards
        });

        currentPlayer = gameUtils.getPlayerToFlipCard({
            playerId: options.playerId,
            player: options.player,
            lastPlayerMadeFlip: currentPlayer,
            players,
            cardsFlippedByPlayers
        });

        card.flip();
        cardsFlippedByPlayers.get(currentPlayer).push(card);
        currentFlippedPair.push(card);
        eventEmitter.emit(gameEvents.CARD_FLIP_EVENT, {
            card,
            player: currentPlayer
        });

        //if pair has been flipped, time to check it
        if (currentFlippedPair.length === 2) {
            let pairEventsToEmit = [gameEvents.PLAYER_FINISHED_FLIPPING_PAIR_EVENT];
            if (gameUtils.cardsArePair(currentFlippedPair[0], currentFlippedPair[1])) {
                pairsFoundByPlayers.get(currentPlayer).push(currentFlippedPair.slice());
                pairEventsToEmit.push(gameEvents.PLAYER_FOUND_PAIR_EVENT);
            }
            else {
                //we need to flip back cards if pair has not been found
                currentFlippedPair.forEach((card) => card.flip());
                pairEventsToEmit.push(gameEvents.PLAYER_MISSED_PAIR_EVENT);
            }

            pairEventsToEmit.forEach(function (eventName) {
                eventEmitter.emit(eventName,
                    {cards: currentFlippedPair, player: currentPlayer});
            });

            currentFlippedPair = [];
        }

        emitPossibleGameEndEvent(this.getState());

        if (currentFlippedPair.length === 2) {
            currentPlayer = undefined;
        }
    };

    players.forEach(function (player) {
        pairsFoundByPlayers.set(player, []);
        cardsFlippedByPlayers.set(player, []);
    });

}

export default FlipCardGame;
