import test from "tape"
import FlipCardGame from "../../src/game/FlipCardGame"
import cardStates from "../../src/game/cardStates"

test("FlipCardGame game state, has to have empty array", (t) => {
  t.plan(1);

  var game = new FlipCardGame();

  t.equal(game.getCards().length, 0);
});
