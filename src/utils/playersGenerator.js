import Player from "../Player";

function generate(amount) {
    if (amount < 0) {
        throw new Error('Amount should not be less than zero');
    }

    var players = [];

    for (var i = 0; i < amount; i++) {
        players.push(new Player({
            id: i
        }));
    }

    return players;
}

export default {
    generate
};
