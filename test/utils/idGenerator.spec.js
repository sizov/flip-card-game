import idGenerator from '../../src/utils/idGenerator';
import test from "tape";

test("idGenerator should generate unique IDs", (t) => {
    t.plan(1);

    const id1 = idGenerator.generate();
    const id2 = idGenerator.generate();

    t.equal(id1 !== id2, true);
});
