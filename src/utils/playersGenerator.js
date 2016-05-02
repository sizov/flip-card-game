import Player from "../Player";

function generate(amount) {
    if (amount < 0) {
        throw new Error('Amount should not be less than zero');
    }

    const players = [];

    for (let i = 0; i < amount; i++) {
        players.push(new Player());
    }

    return players;
}

export default {
    generate
};
