import test from "tape";
import gameUtils from "../../src/utils/gameUtils";
import Player from "../../src/Player";

test("gameUtils.getPlayerToFlipCard should return any player who wish to " +
    "flip if previous player to flip was undefined", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();
    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, []],
        [playerB, []]
    ]);

    const nextPlayer = gameUtils.getPlayerToFlipCard({
        player: playerA,
        players,
        cardsFlippedByPlayers,
        lastPlayerMadeFlip: undefined
    });

    t.equal(nextPlayer, playerA);
});

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
        cardsFlippedByPlayers,
        lastPlayerMadeFlip: playerB
    });

    t.equal(nextPlayer, playerA);
});


test("gameUtils.getPlayerToFlipCard should throw error when player " +
    "makes more than 2 card flips in a row", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();
    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}]],
        [playerB, [{}, {}]]
    ]);

    t.throws(function () {
        gameUtils.getPlayerToFlipCard({
            lastPlayerMadeFlip: playerA,
            player: playerA,
            players,
            cardsFlippedByPlayers
        });
    });
});

test("gameUtils.getPlayerToFlipCard should return passed player to " +
    "make move if that player made less moves than others (by 2)", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}, {}]],
        [playerB, [{}, {}]]
    ]);

    const nextPlayer = gameUtils.getPlayerToFlipCard({
        player: playerA,
        players,
        cardsFlippedByPlayers,
        lastPlayerMadeFlip: playerA
    });

    t.equal(nextPlayer, playerA);
});

test("gameUtils.getPlayerToFlipCard should throw error if current player " +
    "has not finished flipping and next made move", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();

    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}, {}, {}]],
        [playerB, [{}, {}]]
    ]);

    t.throws(function () {
        gameUtils.getPlayerToFlipCard({
            player: playerB,
            players,
            cardsFlippedByPlayers,
            lastPlayerMadeFlip: playerA
        });
    });
});

test("gameUtils.getPlayerToFlipCard should throw error when player " +
    "makes makes move when other player flipped only 1 card", (t) => {
    t.plan(1);

    const playerA = new Player();
    const playerB = new Player();
    const players = [playerA, playerB];

    //simulating cards flipped by players:
    const cardsFlippedByPlayers = new Map([
        [playerA, [{}]],
        [playerB, []]
    ]);

    t.throws(function () {
        gameUtils.getPlayerToFlipCard({
            player: playerB,
            players,
            cardsFlippedByPlayers,
            lastPlayerMadeFlip: playerA
        });
    });
});
