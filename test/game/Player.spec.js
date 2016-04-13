import test from "tape";
import Player from "../../src/game/Player";

test("Player id", (t) => {
    t.plan(1);

    var player = new Player();

    t.equal(player.getId(), undefined);
});

test("Player id non-default", (t) => {
    t.plan(1);

    var player = new Player({
        id: '5'
    });

    t.equal(player.getId(), '5');
});
