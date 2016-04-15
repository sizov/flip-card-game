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

function getPlayerFromOptions(options) {
    if (options.player) {
        const player = options.playersById.get(options.player.getId());
        if (!player) {
            throw new Error('Provided player is not known');
        }
        return player;
    }
    else if (options.playerId) {
        const player = options.playersById.get(options.playerId);
        if (!player) {
            throw new Error('Provided player ID is not known');
        }
        return player;
    }
}

function getCardFromOptions(options) {
    if (options.card) {
        const card = options.cardsById.get(options.card.getId());
        if (!card) {
            throw new Error('Provided card is not known');
        }
        return card;
    }
    else if (options.cardId) {
        const card = options.cardsById.get(options.cardId);
        if (!card) {
            throw new Error('Provided card ID is not known');
        }
        return card;
    }
}

function getPlayerToFlipCard(options) {
    options = options || {};

    //TODO: control the amount of moves - only two moves per player

    var player = getPlayerFromOptions(options);
    if (player) {
        if (!isValidPlayerToDoFlip(player, options.cardsFlippedByPlayers)) {
            throw new Error(`Player ${player.getId()} can't flip cards now`);
        }
        return player;
    }

    player = getNextValidPlayer(options.cardsFlippedByPlayers);
    if (!player) {
        throw new Error('Error finding next valid player');
    }

    return player;
}

function getCardToFlip(options) {
    options = options || {};

    var card = getCardFromOptions(options);
    if (card) {
        if (card.getState() === cardStates.FACE) {
            throw new Error(`Error flipping card ${card.getId()} as it is flipped already`);
        }
        return card;
    }

    card = getNextRandomCard();
    if (!card) {
        throw new Error('Error finding next card to flip');
    }
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
