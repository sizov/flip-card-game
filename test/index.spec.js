import test from "tape";
import flipCardGame from "../src/index";
import FlipCardGame from "../src/FlipCardGame";

test("flipCardGame module should have FlipCardGame class defined on it", (t) => {
    t.plan(1);
    t.equal(FlipCardGame, flipCardGame.FlipCardGame);
});
