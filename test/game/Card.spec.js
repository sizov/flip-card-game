import test from "tape";
import Card from "../../src/game/Card";
import cardStates from "../../src/game/cardStates";

test("Card state", (t) => {
    t.plan(1);

    var card = new Card();

    t.equal(card.state, cardStates.BACK);
});

test("Card id", (t) => {
    t.plan(1);

    var card = new Card();

    t.equal(card.id, undefined);
});

test("Card id non-default", (t) => {
    t.plan(1);

    var card = new Card({
        id: 5
    });

    t.equal(card.id, 5);
});

test("Card pairId", (t) => {
    t.plan(1);

    var card = new Card();

    t.equal(card.pairId, undefined);
});

test("Card pairId non-default", (t) => {
    t.plan(1);

    var card = new Card({
        id: 5,
        pairId: 7
    });

    t.equal(card.pairId, 7);
});

test("Card set state", (t) => {
    t.plan(1);

    var card = new Card();

    card.state = cardStates.FACE;

    t.equal(card.state, cardStates.FACE);
});

test.only("Card flip", (t) => {
    t.plan(2);

    var card = Card();

    t.equal(card.state, cardStates.BACK);
    card.flip();

    t.equal(card.state, cardStates.FACE);

    //card.flip();
    //t.equal(card.state, cardStates.BACK);
});
