import test from "tape";
import Card from "../../src/game/Card";
import cardStates from "../../src/game/cardStates";

test("Card state", (t) => {
    t.plan(1);

    var card = new Card();

    t.equal(card.getState(), cardStates.BACK);
});

test("Card id", (t) => {
    t.plan(1);

    var card = new Card();

    t.equal(card.getId(), undefined);
});

test("Card id non-default", (t) => {
    t.plan(1);

    var card = new Card({
        id: 5
    });

    t.equal(card.getId(), 5);
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
