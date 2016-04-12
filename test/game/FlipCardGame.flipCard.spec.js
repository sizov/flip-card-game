import test from "tape";
import FlipCardGame from "../../src/game/FlipCardGame";
import cardStates from "../../src/game/constants/cardStates";
import gameStates from "../../src/game/constants/gameStates";

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

test.only("FlipCardGame flip should change the state of cards", (t) => {
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

//test when flipped already flipped card - exception
