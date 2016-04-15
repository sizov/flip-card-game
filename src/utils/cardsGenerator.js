import Card from "../Card";

function generate(amount) {
    if (amount < 0) {
        throw new Error('Amount should not be less than zero');
    }

    var cards = [],
        pairId = 0;

    for (var i = 0; i < amount; i++) {
        cards.push(new Card({
            id: i,
            pairId: pairId
        }));

        if (pairId % 2 !== 0) {
            pairId = pairId + 1;
        }
    }

    return cards;
}

export default {
    generate
};
