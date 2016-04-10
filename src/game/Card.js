import cardStates from './cardStates.js';

const DEFAULT_OPTIONS = {
    id: undefined,
    pairId: undefined
};

function Card(options) {
    options = options || {};
    options = Object.assign(DEFAULT_OPTIONS, options);

    var state = cardStates.BACK;
    var id = options.id;

    /**
     * Each picture on the card has pair in the game.
     * This field stores an id of pair (the second card of the pair will have same id)
     */
    var pairId = options.pairId;

    this.getState = () => state;
    this.getId = () => id;
    this.getPairId = () => pairId;

    this.setState = function (value) {
        if (value !== cardStates.BACK && value !== cardStates.FACE) {
            throw new Error(`Unexpected state ${value}`);
        }

        state = value;
    };

    this.flip = function () {
        if (state === cardStates.FACE) {
            state = cardStates.BACK;
        }
        else if (state === cardStates.BACK) {
            state = cardStates.FACE;
        }
    };
}

export default Card;
