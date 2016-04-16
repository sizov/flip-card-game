import cardStates from "../constants/cardStates";
import gameStates from "../../src/constants/gameStates";

/**
 * Gets next valid player for the move. Checks which player made less moves
 */
function getNextValidPlayer(cardsFlippedByPlayers) {

}

function getNextRandomCard() {

}

/**
 * Checks if this player can move now
 * @param player
 */
function isValidPlayerToDoFlip(player, cardsFlippedByPlayer) {
    //TODO: make sure that this player has not flipped more than 2 cards than others players
    return true;
}

function getObjectByOptions(options) {
    var searchedId;
    if (options.object) {
        searchedId = options.object.getId();
    }
    else if (options.id) {
        searchedId = options.id;
    }

    var foundObjects = options.objects.filter((object)=>object.getId() === searchedId);
    if (foundObjects.length === 0) {
        throw new Error(`Error finding object with id ${searchedId}`);
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
        player = getNextValidPlayer(options.cardsFlippedByPlayers);
    }

    if (!isValidPlayerToDoFlip(player, options.cardsFlippedByPlayers)) {
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
 * @param cardPairsFoundByPlayers
 * @returns {Array}
 */
function getWinningPlayers(cardPairsFoundByPlayers) {
    var playersByFoundAmount = new Map();

    cardPairsFoundByPlayers.forEach(function (cardPairsFoundByPlayer, player) {
        var amountFoundByPlayer = cardPairsFoundByPlayer.length;
        if (!playersByFoundAmount.has(amountFoundByPlayer)) {
            playersByFoundAmount.set(amountFoundByPlayer, []);
        }
        playersByFoundAmount.get(amountFoundByPlayer).push(player);
    });

    var longestArray = [];
    playersByFoundAmount.forEach(function (players) {
        if (players.length > longestArray.length) {
            longestArray = players;
        }
    });

    return longestArray;
}

function getGameState(options) {
    var flippedCards = [];

    options.cardsFlippedByPlayers.forEach(function (card) {
        flippedCards.push(card);
    });

    if (flippedCards.length === 0) {
        return gameStates.NEW;
    }

    var totalCardsWithPairsFound = [];
    options.cardPairsFoundByPlayers.forEach(function (cards) {
        cards.forEach(function (card) {
            totalCardsWithPairsFound.push(card);
        });
    });

    if (options.cards.length > totalCardsWithPairsFound.length) {
        return gameStates.PLAYING;
    }

    if (options.cards.length === totalCardsWithPairsFound.length) {
        var winningPlayers = getWinningPlayers(options.cardPairsFoundByPlayers);
        if (winningPlayers.length === 1) {
            return gameStates.OVER;
        }
        return gameStates.DRAW;
    }

    throw new Error('Gme state can\'t be calculated');
}

export default {
    getGameState,
    getPlayerToFlipCard,
    getCardToFlip
};
