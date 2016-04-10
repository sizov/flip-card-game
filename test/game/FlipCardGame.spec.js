import test from "tape";
import FlipCardGame from "../../src/game/FlipCardGame";
import cardStates from "../../src/game/cardStates";

test("FlipCardGame game state, has to have cards array of predefined length", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    t.equal(game.getCards().length, 10);
});

test("FlipCardGame game state, has to have cards array of predefined length", (t) => {
    t.plan(1);

    var game = new FlipCardGame({
        cardsAmount: 20
    });

    t.equal(game.getCards().length, 20);
});

test("FlipCardGame game state, has to have empty players array", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    t.equal(game.getPlayers().length, 0);
});

test("FlipCardGame game state, has to have empty current player array", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    t.equal(game.getCurrentPlayer(), undefined);
});
