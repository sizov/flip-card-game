import cardStates from "../constants/cardStates";
import gameStates from "../../src/constants/gameStates";

/**
 * Gets next valid player for the move. Checks which player made less moves
 */
function getNextValidPlayer() {

}

function getNextRandomCard() {

}

/**
 * Checks if passed player can make move on current state of the game.
 * Basically it looks if passed player moved more cards than others
 *
 * @param options Options
 * @param options.player Player to make move
 * @param options.cardsFlippedByPlayers Map of cards flipped by each player
 * @param options.lastPlayerMadeFlip Last player who made flip
 *
 * @returns {boolean} Valid player to move or not
 */
function isValidPlayerToDoFlip(options) {
    //if last was undefined, anyone can move
    if (typeof options.lastPlayerMadeFlip === 'undefined') {
        return true;
    }

    const cardsFlippedByLastPlayer = options.cardsFlippedByPlayers.get(options.lastPlayerMadeFlip);
    const lastPlayerFinishedFlippingPair =
        cardsFlippedByLastPlayer.length % 2 === 0;

    if (lastPlayerFinishedFlippingPair) {
        if (options.player === options.lastPlayerMadeFlip) {
            return false;
        }
    }
    else if (options.player !== options.lastPlayerMadeFlip) {
        return false;
    }

    return true;
}

function getObjectByOptions(options) {
    const filterByInstance = (object) => object === options.object;
    const filterById = (object) => object.getId() === options.id;
    const filterFn = typeof options.id !== 'undefined' ? filterById :
        filterByInstance;

    const foundObjects = options.objects.filter(filterFn);
    if (foundObjects.length === 0) {
        throw new Error(`Error finding object`);
    }

    return foundObjects[0];
}

/**
 * Gets player for next move. You can pass player instance and it will check
 * if instance is among collection of players that play game (same with passing
 * player Id). Or if you don't pass player - it will calculate who is next to
 * move among all players.
 *
 * @param options Options object
 * @param options.player Player instance
 * @param options.playerId Id of player
 * @param options.players Array of players
 *
 * @returns {*} Next player to make move
 */
function getPlayerToFlipCard(options) {
    options = options || {};

    var player;

    if (options.player || options.playerId) {
        player = getObjectByOptions({
            id: options.playerId,
            object: options.player,
            objects: options.players
        });
    }
    else {
        player = getNextValidPlayer();
    }

    if (!isValidPlayerToDoFlip({
            player,
            lastPlayerMadeFlip: options.lastPlayerMadeFlip,
            cardsFlippedByPlayers: options.cardsFlippedByPlayers
        })) {
        throw new Error(`Player ${player.getId()} can't flip cards now`);
    }

    if (!player) {
        throw new Error('Error finding next valid player');
    }

    return player;
}

function getCardToFlip(options) {
    options = options || {};

    var card;
    if (options.card || options.cardId) {
        card = getObjectByOptions({
            id: options.cardId,
            object: options.card,
            objects: options.cards
        });
    }
    else {
        card = getNextRandomCard();
    }

    if (!card) {
        throw new Error('Error finding next card to flip');
    }

    if (card.getState() === cardStates.FACE) {
        throw new Error(`Error flipping card ${card.getId()} as it is flipped already`);
    }

    return card;
}

/**
 * Checks amount of card pairs found bvy each player and calculates which player(s) has(ve)
 * most amount of card pairs found
 * @returns {Array}
 * @param options
 */
function getWinners(options) {
    //when there are 6 cards and someone found 2 pairs, there is no chance
    //for other person to win!
    const totalPairs = Math.floor(options.cards.length / 2);
    const pairsRequiredToWinImmediately = Math.floor(totalPairs / 2) + 1;
    const playersByFoundPairsAmount = new Map();
    var pairsFound = 0;
    var maxFoundPairsAmount = 0;

    for (let [player, pairsFoundByPlayer] of options.pairsFoundByPlayers) {
        const pairsAmountFoundByPlayer = pairsFoundByPlayer.length;

        pairsFound += pairsAmountFoundByPlayer;

        if (pairsAmountFoundByPlayer >= pairsRequiredToWinImmediately) {
            return [player];
        }

        if (pairsAmountFoundByPlayer > maxFoundPairsAmount) {
            maxFoundPairsAmount = pairsAmountFoundByPlayer;
        }

        if (!playersByFoundPairsAmount.has(pairsAmountFoundByPlayer)) {
            playersByFoundPairsAmount.set(pairsAmountFoundByPlayer, []);
        }

        playersByFoundPairsAmount.get(pairsAmountFoundByPlayer).push(player);
    }

    //TODO: take into account order of moves, you can identify game state earlier

    const remainingPairs = totalPairs - pairsFound;
    const playersWithMaxFoundPairs = playersByFoundPairsAmount.get(maxFoundPairsAmount);

    //identifying draw
    if (remainingPairs === 0) {
        return playersWithMaxFoundPairs.slice();
    }

    //if there are unfound pairs and more than 1 player with maximum amount
    // of found cards - any of them can win and we can't find winner now
    if (playersWithMaxFoundPairs.length > 1) {
        //if remaining pairs amount + pairs found by anyone is less
        // than max, max won
        return [];
    }

    //now we need to understand if single player who has more cards than others
    // leaves any chances to others
    for (let [pairsAmount] of playersByFoundPairsAmount) {
        //If any other player has chance to get more or equal to max, game
        // goes on
        if ((pairsAmount + remainingPairs) >= maxFoundPairsAmount) {
            return [];
        }
    }

    return playersWithMaxFoundPairs.slice();
}

function getGameState(options) {
    if (!options.currentPlayer) {
        return {state: gameStates.NEW};
    }

    const winners = getWinners({
        cards: options.cards,
        pairsFoundByPlayers: options.pairsFoundByPlayers
    });

    if (winners.length === 0) {
        return {state: gameStates.PLAYING};
    }

    if (winners.length === 1) {
        return {state: gameStates.OVER, winners};
    }

    return {state: gameStates.DRAW, winners};
}

var cardsArePair = (cardA, cardB) => cardA.getPairId() === cardB.getPairId();

export default {
    cardsArePair,
    getGameState,
    getPlayerToFlipCard,
    getCardToFlip,
    getWinners
};
