import test from "tape";
import FlipCardGame from "../../src/game/FlipCardGame";
import cardStates from "../../src/game/constants/cardStates";
import gameStates from "../../src/game/constants/gameStates";
import gameEvents from "../../src/game/constants/gameEvents";

test("FlipCardGame flip should change the state of cards", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    const players = game.getPlayers();
    const player0 = players[0];

    const cards = game.getCards();
    const card0 = cards[0];

    game.flipCard({
        card: card0,
        player: player0
    });

    t.equal(game.getCards()[0].getState(), cardStates.FACE);
});

test.only("FlipCardGame flip should change the state of cards, event fired", (t) => {
    t.plan(2);

    var game = new FlipCardGame();

    const players = game.getPlayers();
    const player0 = players[0];

    const cards = game.getCards();
    const card0 = cards[0];

    game.on(gameEvents.FLIP, function (event) {
        t.equal(event.card.getState(), cardStates.FACE);
        t.equal(event.card.getId(), card0.getId());
    });

    game.flipCard({
        card: card0,
        player: player0
    });

});

test("FlipCardGame flip should change the state of cards", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    const players = game.getPlayers();
    const player1 = players[1];

    const cards = game.getCards();
    const card3 = cards[3];

    game.flipCard({
        card: card3,
        player: player1
    });

    t.equal(game.getCards()[3].getState(), cardStates.FACE);
});

test("FlipCardGame flip should change the state of cards if cardId is used", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    const players = game.getPlayers();
    const player1 = players[1];

    const cards = game.getCards();
    const card3 = cards[3];
    const card3Id = card3.getId();

    game.flipCard({
        cardId: card3Id,
        player: player1
    });

    t.equal(game.getCards()[3].getState(), cardStates.FACE);
});

test("FlipCardGame flip should change the state of cards if playerId is used", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    const players = game.getPlayers();
    const player1 = players[1];
    const player1Id = player1.getId();

    const cards = game.getCards();
    const card3 = cards[3];

    game.flipCard({
        card: card3,
        playerId: player1Id
    });

    t.equal(game.getCards()[3].getState(), cardStates.FACE);
});

test("FlipCardGame flip should throw if card to flip ID does not exist", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    function tryFlip() {
        game.flipCard({
            cardId: '999'
        })
    }

    t.throws(tryFlip);
});

test("FlipCardGame flip should throw if player to flip ID does not exist", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    function tryFlip() {
        game.flipCard({
            playerId: '999'
        })
    }

    t.throws(tryFlip);
});
