import test from "tape";
import {FlipCardGame} from "../src/index";
import FlipCardGameOriginal from "../src/FlipCardGame";

test("flipCardGame module should have FlipCardGame class defined on it", (t) => {
    t.plan(1);
    t.equal(FlipCardGame, FlipCardGameOriginal);
});
