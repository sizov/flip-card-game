import cardStates from './cardStates.js';
import HasId from './HasId';

const DEFAULT_OPTIONS = {
    state: cardStates.BACK,

    id: undefined,

    /**
     * Each picture on the card has pair in the game.
     * This field stores an id of pair (the second card of the pair will have same id)
     */
    pairId: undefined
};

function Card(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    var getState = () => options.state;
    var getPairId = () => options.pairId;

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
        HasId({
            id: options.id
        }),
        {
            getState,
            setState,
            getPairId,
            flip
        }
    );
}

export default Card;
