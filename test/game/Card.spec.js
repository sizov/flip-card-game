import test from "tape"
import Card from "../../src/game/Card"
import cardStates from "../../src/game/cardStates"

test("Card state", (t) => {
  t.plan(1);

  var card = new Card();

  t.equal(cardStates.BACK, card.getState());
});

test("Card setState", (t) => {
  t.plan(1);

  var card = new Card();

  card.setState(cardStates.FACE);

  t.equal(cardStates.FACE, card.getState());
});

test("Card flip", (t) => {
  t.plan(3);

  var card = new Card();

  t.equal(cardStates.BACK, card.getState());
  card.flip();
  t.equal(cardStates.FACE, card.getState());
  card.flip();
  t.equal(cardStates.BACK, card.getState());
});
