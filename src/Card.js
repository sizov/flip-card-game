import idGenerator from './utils/idGenerator';
import cardStates from './constants/cardStates.js';

const DEFAULT_OPTIONS = {
    state: cardStates.BACK,

    /**
     * Each picture on the card has pair in the game.
     * This field stores an id of pair (the second card of the pair will have same id)
     */
    pairId: undefined
};

function Card(options) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    const id = idGenerator.generate();
    this.getId = () => id;

    this.getState = () => options.state;
    this.getPairId = () => options.pairId;

    this.setState = function (value) {
        if (value !== cardStates.BACK && value !== cardStates.FACE) {
            throw new Error(`Unexpected state ${value}`);
        }

        options.state = value;
    };

    this.flip = function () {
        if (options.state === cardStates.FACE) {
            this.setState(cardStates.BACK);
        }
        else if (options.state === cardStates.BACK) {
            this.setState(cardStates.FACE);
        }
    };
}

export default Card;
