import test from "tape";
import Player from "../../src/game/Player";

test("Player should have empty collection of paired cards", (t) => {
  t.plan(1);

  var player = new Player();

  t.equal(player.getParedCards().length, 0);
});
