import Card from './Card.js';
import HasId from './HasId';

const DEFAULT_OPTIONS = {
    id: undefined,

    /**
     * Each picture on the card has pair in the game.
     * This field stores an id of pair (the second card of the pair will have same id)
     */
    pairId: undefined
};

function Player(options) {
    options = options || {};
    options = Object.assign(DEFAULT_OPTIONS, options);

    /**
     * Collection of card pairs that Player has
     * @type {Array}
     */
    const pairedCards = [];

    function addPair(card1, card2) {
        pairedCards.push([card1, card2]);
    }

    return Object.assign(
        {},
        HasId({id: options.id}),
        {
            get pairedCards() {
                return pairedCards;
            },

            addPair
        }
    );
}

export default Player;
