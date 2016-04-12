import cardStates from './constants/cardStates.js';
import HasId from './partials/HasId';

const DEFAULT_OPTIONS = {
    id: undefined,

    state: cardStates.BACK,

    /**
     * Each picture on the card has pair in the game.
     * This field stores an id of pair (the second card of the pair will have same id)
     */
    pairId: undefined
};

function Card(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    const getState = () => options.state;
    const getPairId = () => options.pairId;

    function setState(value) {
        if (value !== cardStates.BACK && value !== cardStates.FACE) {
            throw new Error(`Unexpected state ${value}`);
        }

        options.state = value;
    }

    function flip() {
        if (options.state === cardStates.FACE) {
            setState(cardStates.BACK);
        }
        else if (options.state === cardStates.BACK) {
            setState(cardStates.FACE);
        }
    }

    return Object.assign(
        {},
        HasId({id: options.id}),
        {
            getState,
            setState,
            getPairId,
            flip
        }
    );
}

export default Card;
