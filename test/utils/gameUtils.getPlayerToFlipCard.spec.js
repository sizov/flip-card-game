import test from "tape";
import gameUtils from "../../src/utils/gameUtils";
import Player from "../../src/Player";

test("gameUtils.getPlayerToFlipCard should correctly identify player to " +
    "make move if player instance was passed", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}]],
        [playerB, [{}, {}]]
    ]);

    const nextPlayer = gameUtils.getPlayerToFlipCard({
        player: playerA,
        players,
        cardsFlippedByPlayers
    });

    t.equal(nextPlayer, playerA);
});

test("gameUtils.getPlayerToFlipCard should correctly identify player to " +
    "make move if playerId was passed", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();
    const id = playerA.getId();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}]],
        [playerB, [{}, {}]]
    ]);

    const nextPlayer = gameUtils.getPlayerToFlipCard({
        playerId: id,
        players,
        cardsFlippedByPlayers
    });

    t.equal(nextPlayer, playerA);
});

test("gameUtils.getPlayerToFlipCard should return passed player to " +
    "make move if all players flipped equal amount of cards", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}]],
        [playerB, [{}, {}]]
    ]);

    const nextPlayer = gameUtils.getPlayerToFlipCard({
        player: playerA,
        players,
        cardsFlippedByPlayers
    });

    t.equal(nextPlayer, playerA);
});

test("gameUtils.getPlayerToFlipCard should return passed player to " +
    "make move if that player made less moves than others (by 2)", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}, {}, {}]],
        [playerB, [{}, {}]]
    ]);

    const nextPlayer = gameUtils.getPlayerToFlipCard({
        player: playerB,
        players,
        cardsFlippedByPlayers
    });

    t.equal(nextPlayer, playerB);
});

test("gameUtils.getPlayerToFlipCard should throw error when passed player " +
    "made more than 2 moves than other players", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}, {}, {}]],
        [playerB, [{}, {}]]
    ]);

    t.throws(function () {
        gameUtils.getPlayerToFlipCard({
            player: playerA,
            players,
            cardsFlippedByPlayers
        });
    });
});

test("gameUtils.getPlayerToFlipCard should throw error when passed player " +
    "made more than 2 moves than other players", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}, {}, {}, {}]],
        [playerB, [{}, {}]]
    ]);

    t.throws(function () {
        gameUtils.getPlayerToFlipCard({
            player: playerA,
            players,
            cardsFlippedByPlayers
        });
    });
});
