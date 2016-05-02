import Card from "../Card";

function generate(amount) {
    if (amount < 0) {
        throw new Error('Amount should not be less than zero');
    }

    const cards = [];
    var pairId = 0;

    for (let i = 0; i < amount; i++) {
        cards.push(new Card({
            pairId: pairId.toString()
        }));

        if (i % 2 !== 0) {
            pairId = pairId + 1;
        }
    }

    return cards;
}

export default {
    generate
};
