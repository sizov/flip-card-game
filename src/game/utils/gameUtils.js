import cardStates from "../constants/cardStates";

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
        const player = options.playersById[options.player.getId()];
        if (typeof player === 'undefined') {
            throw new Error('Provided player is not known');
        }
        return player;
    }
    else if (options.playerId) {
        const player = options.playersById[options.playerId];
        if (typeof player === 'undefined') {
            throw new Error('Provided player ID is not known');
        }
        return player;
    }
}

function getCardFromOptions(options) {
    if (options.card) {
        const card = options.cardsById[options.card.getId()];
        if (typeof card === 'undefined') {
            throw new Error('Provided card is not known');
        }
        return card;
    }
    else if (options.cardId) {
        const card = options.cardsById[options.cardId];
        if (typeof card === 'undefined') {
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

export default {
    getPlayerToFlipCard,
    getCardToFlip
};
