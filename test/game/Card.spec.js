import test from "tape";
import Card from "../../src/game/Card";
import cardStates from "../../src/game/cardStates";

test("Card state", (t) => {
  t.plan(1);

  var card = new Card();

  t.equal(card.getState(), cardStates.BACK);
});

test("Card setState", (t) => {
  t.plan(1);

  var card = new Card();

  card.setState(cardStates.FACE);

  t.equal(card.getState(), cardStates.FACE);
});

test("Card flip", (t) => {
  t.plan(3);

  var card = new Card();

  t.equal(card.getState(), cardStates.BACK);
  card.flip();
  t.equal(card.getState(), cardStates.FACE);
  card.flip();
  t.equal(card.getState(), cardStates.BACK);
});
