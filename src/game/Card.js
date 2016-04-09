import cardStates from './cardStates.js';

function Card() {
  var state = cardStates.BACK;

  this.getState = () => state;

  this.setState = function (value) {
    if (value !== cardStates.BACK && value !== cardStates.FACE) {
      throw new Error(`Unexpected state ${value}`);
    }

    state = value;
  }

  this.flip = function () {
    if (state === cardStates.FACE) {
      state = cardStates.BACK;
    }
    else if (state === cardStates.BACK) {
      state = cardStates.FACE;
    }
  }
}

export default Card;
