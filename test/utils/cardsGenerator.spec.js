import test from "tape";
import cardsGenerator from "../../src/utils/cardsGenerator";

test("gameUtils should generate cards with pairs of sililar IDs", (t) => {
    t.plan(6);

    const cards = cardsGenerator.generate(6);

    t.equal(cards[0].getPairId(), '0');
    t.equal(cards[1].getPairId(), '0');
    t.equal(cards[2].getPairId(), '1');
    t.equal(cards[3].getPairId(), '1');
    t.equal(cards[4].getPairId(), '2');
    t.equal(cards[5].getPairId(), '2');
});
