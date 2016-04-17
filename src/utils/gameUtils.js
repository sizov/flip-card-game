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
 * Checks if this player can move now
 * @param player
 */
function isValidPlayerToDoFlip(player) {
    //TODO: make sure that this player has not flipped more than 2 cards than others players
    return true;
}

function getObjectByOptions(options) {
    if (options.object) {
        let foundObjects = options.objects.filter((object) => object === options.object);
        if (foundObjects.length === 0) {
            throw new Error(`Error finding object`);
        }

        return foundObjects[0];
    }

    let foundObjects = options.objects.filter((object)=>object.getId() === options.id);
    if (foundObjects.length === 0) {
        throw new Error(`Error finding object with id ${options.id}`);
    }

    return foundObjects[0];
}

function getPlayerToFlipCard(options) {
    options = options || {};

    //TODO: control the amount of moves - only two moves per player

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

    if (!isValidPlayerToDoFlip(player)) {
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

        console.log('pairsAmountFoundByPlayer', player.getId(), '=', pairsFoundByPlayer.length);

        pairsFound = pairsFound + pairsAmountFoundByPlayer;

        if (pairsAmountFoundByPlayer >= pairsRequiredToWinImmediately) {
            console.log('winner!', pairsAmountFoundByPlayer, pairsRequiredToWinImmediately);
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

    //TODO: take into account order of moves, you can identify game state
    // earlier

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
    for (let [pairsAmount, players] of playersByFoundPairsAmount) {
        //If remaining pairs amount + pairs found
        // by anyone is less than max, max won
        if ((pairsAmount + remainingPairs) < maxFoundPairsAmount) {
            return playersWithMaxFoundPairs.slice();
        }
    }

    return [];
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

export default {
    getGameState,
    getPlayerToFlipCard,
    getCardToFlip,
    getWinners
};
