import test from "tape";
import FlipCardGame from "../src/FlipCardGame";
import cardStates from "../src/constants/cardStates";
import gameStates from "../src/constants/gameStates";

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

test("FlipCardGame game state, has to have default 2 players", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    t.equal(game.getPlayers().length, 2);
});

test("FlipCardGame game state, has to have empty current player array", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    t.equal(game.getCurrentPlayer(), undefined);
});

test("FlipCardGame game state, has to be in new state on start", (t) => {
    t.plan(1);

    var game = new FlipCardGame();

    t.equal(game.getState(), gameStates.NEW);
});
