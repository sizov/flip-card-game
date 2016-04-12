import Card from './Card.js';
import HasId from './partials/HasId';

const DEFAULT_OPTIONS = {
    id: undefined
};

function Player(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    /**
     * Collection of card pairs that Player has
     * @type {Array}
     */
    const pairedCards = [];
    const getPairedCards = () => pairedCards;

    function addPair(card1, card2) {
        pairedCards.push([card1, card2]);
    }

    return Object.assign(
        {},
        HasId({id: options.id}),
        {
            getPairedCards,
            addPair
        }
    );
}

export default Player;
