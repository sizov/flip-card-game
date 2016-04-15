import HasId from './partials/HasId';

const DEFAULT_OPTIONS = {
    id: undefined
};

function Player(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    function addPair(card1, card2) {
        pairedCards.push([card1, card2]);
    }

    return Object.assign(
        {},
        HasId({id: options.id})
    );
}

export default Player;
