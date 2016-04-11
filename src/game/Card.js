import cardStates from './cardStates.js';
import HasId from './HasId';

const DEFAULT_OPTIONS = {
    id: undefined,

    /**
     * Each picture on the card has pair in the game.
     * This field stores an id of pair (the second card of the pair will have same id)
     */
    pairId: undefined
};

function Card(options) {
    options = options || {};
    options = Object.assign(DEFAULT_OPTIONS, options);

    var privateState = cardStates.BACK;

    function setState(value) {
        if (value !== cardStates.BACK && value !== cardStates.FACE) {
            throw new Error(`Unexpected state ${value}`);
        }

        privateState = value;
    }

    function flip() {
        if (privateState === cardStates.FACE) {
            setState(cardStates.BACK);
        }
        else if (privateState === cardStates.BACK) {
            setState(cardStates.FACE);
        }
    }

    return Object.assign(
        {},
        HasId({
            id: options.id
        }),
        {
            get state() {
                return privateState;
            },
            set state(value) {
                return setState(value);
            },
            get pairId() {
                return options.pairId;
            },
            flip
        }
    );
}

export default Card;
