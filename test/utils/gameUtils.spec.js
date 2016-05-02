import test from "tape";
import gameUtils from "../../src/utils/gameUtils";
import cardsGenerator from "../../src/utils/cardsGenerator";
import playersGenerator from "../../src/utils/playersGenerator";
import gameStates from "../../src/constants/gameStates";
import Card from "../../src/Card";
import Player from "../../src/Player";

function getFlippedCard(options) {
    var card = new Card(options);
    card.flip();
    return card;
}

test("gameUtils should identify that game is in DRAW state when all" +
    " cards have been flipped and all players have same amount of " +
    "found pairs", (t) => {
    t.plan(1);

    const card0 = getFlippedCard({id: '0', pardId: '0'});
    const card1 = getFlippedCard({id: '1', pardId: '0'});
    const card2 = getFlippedCard({id: '2', pardId: '1'});
    const card3 = getFlippedCard({id: '3', pardId: '1'});
    const cards = [card0, card1, card2, card3];

    const playerA = new Player({id: '0'});
    const playerB = new Player({id: '1'});

    const pairsFoundByPlayers = new Map();
    pairsFoundByPlayers.set(playerA, [
        [card0, card1]
    ]);
    pairsFoundByPlayers.set(playerB, [
        [card2, card3]
    ]);

    const gameState = gameUtils.getGameState({
        currentPlayer: playerA,
        cards,
        pairsFoundByPlayers
    });

    t.equal(gameState.state, gameStates.DRAW);
});

test("gameUtils should identify that game is in OVER state when all cards " +
    "have been flipped and one players has larger amount of found pairs", (t) => {
    t.plan(1);

    const card0 = getFlippedCard({id: '0', pardId: '0'});
    const card1 = getFlippedCard({id: '1', pardId: '0'});
    const card2 = getFlippedCard({id: '2', pardId: '1'});
    const card3 = getFlippedCard({id: '3', pardId: '1'});
    const cards = [card0, card1, card2, card3];

    const playerA = new Player({id: '0'});
    const playerB = new Player({id: '1'});

    const pairsFoundByPlayers = new Map();
    pairsFoundByPlayers.set(playerA, [
        [card0, card1], [card2, card3]
    ]);
    pairsFoundByPlayers.set(playerB, []);

    const gameState = gameUtils.getGameState({
        currentPlayer: playerA,
        cards,
        pairsFoundByPlayers
    });

    t.equal(gameState.state, gameStates.OVER);
});

test("gameUtils should identify that game is in PLAYING state when all" +
    " cards have NOT been flipped", (t) => {
    t.plan(1);

    const card0 = getFlippedCard({id: '0', pardId: '0'});
    const card1 = getFlippedCard({id: '1', pardId: '0'});
    const card2 = getFlippedCard({id: '2', pardId: '1'});
    const card3 = getFlippedCard({id: '3', pardId: '1'});
    const cards = [card0, card1, card2, card3];

    const playerA = new Player({id: '0'});
    const playerB = new Player({id: '1'});

    const pairsFoundByPlayers = new Map();
    pairsFoundByPlayers.set(playerA, [
        [card0, card1]
    ]);
    pairsFoundByPlayers.set(playerB, []);

    const gameState = gameUtils.getGameState({
        currentPlayer: playerA,
        cards,
        pairsFoundByPlayers
    });

    t.equal(gameState.state, gameStates.PLAYING);
});

test("gameUtils should identify that game is in NEW state when none of" +
    " the " +
    "players made moves", (t) => {
    t.plan(1);

    const gameState = gameUtils.getGameState({currentPlayer: undefined});

    t.equal(gameState.state, gameStates.NEW);
});

test("gameUtils should identify single winner", (t) => {
    t.plan(2);

    const cards = cardsGenerator.generate(4);
    const players = playersGenerator.generate(2);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [[cards[0], cards[1]], [cards[2], cards[3]]]);
    pairsFoundByPlayers.set(players[1], []);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 1);
    t.equal(winners[0], players[0]);
});

test("gameUtils should identify draw", (t) => {
    t.plan(3);

    const cards = cardsGenerator.generate(4);
    const players = playersGenerator.generate(2);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [[cards[0], cards[1]]]);
    pairsFoundByPlayers.set(players[1], [[cards[2], cards[3]]]);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 2);
    t.equal(winners[0], players[0]);
    t.equal(winners[1], players[1]);
});

test("gameUtils should identify that there are no winners yet", (t) => {
    t.plan(1);

    const cards = cardsGenerator.generate(4);
    const players = playersGenerator.generate(2);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [[cards[0], cards[1]]]);
    pairsFoundByPlayers.set(players[1], []);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 0);
});

test("gameUtils should identify that there is a winner when game " +
    "setup is: total pairs: 5; 3, 1, 1 => winnder 1st", (t) => {
    t.plan(2);

    const cards = cardsGenerator.generate(10);
    const players = playersGenerator.generate(3);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [
        [cards[0], cards[1]], [cards[2], cards[3]], [cards[4], cards[5]]
    ]);
    pairsFoundByPlayers.set(players[1], [
        [[cards[6], cards[7]]]
    ]);
    pairsFoundByPlayers.set(players[2], [
        [[cards[8], cards[9]]]
    ]);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 1);
    t.equal(winners[0], players[0]);
});

test("gameUtils should identify that there are no winners yet when game" +
    "setup is: total pairs: 5; 2, 1, 1 => draw still possible", (t) => {
    t.plan(1);

    const cards = cardsGenerator.generate(10);
    const players = playersGenerator.generate(3);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [
        [cards[0], cards[1]], [cards[2], cards[3]]
    ]);
    pairsFoundByPlayers.set(players[1], [
        [cards[4], cards[5]]
    ]);
    pairsFoundByPlayers.set(players[2], [
        [[cards[6], cards[7]]]
    ]);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 0);
});

test("gameUtils should identify that there is draw when" +
    " game setup is: total pairs: 5; 2, 2, 1", (t) => {
    t.plan(3);

    const cards = cardsGenerator.generate(10);
    const players = playersGenerator.generate(3);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [
        [cards[0], cards[1]],
        [cards[2], cards[3]]
    ]);
    pairsFoundByPlayers.set(players[1], [
        [cards[4], cards[5]],
        [cards[6], cards[7]]
    ]);
    pairsFoundByPlayers.set(players[2], [
        [cards[8], cards[9]]
    ]);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 2);
    t.equal(winners[0], players[0]);
    t.equal(winners[1], players[1]);
});

test("gameUtils should identify that there is draw when" +
    " game setup is: total pairs: 2; 1, 1", (t) => {
    t.plan(3);

    const cards = cardsGenerator.generate(4);
    const players = playersGenerator.generate(2);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [
        [cards[0], cards[1]]
    ]);
    pairsFoundByPlayers.set(players[1], [
        [cards[2], cards[3]]
    ]);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 2);
    t.equal(winners[0], players[0]);
    t.equal(winners[1], players[1]);
});

test("gameUtils should identify that there is no winner yet when" +
    " game setup is: total pairs: 5; 2, 2, 0", (t) => {
    t.plan(1);

    const cards = cardsGenerator.generate(10);
    const players = playersGenerator.generate(3);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [
        [cards[0], cards[1]],
        [cards[2], cards[3]]
    ]);
    pairsFoundByPlayers.set(players[1], [
        [cards[4], cards[5]],
        [cards[6], cards[7]]
    ]);
    pairsFoundByPlayers.set(players[2], []);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 0);
});

test("gameUtils should identify that there is no winner yet when" +
    " game setup is: total pairs: 6; 3, 0, 2", (t) => {
    t.plan(1);

    const cards = cardsGenerator.generate(12);
    const players = playersGenerator.generate(3);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [
        [cards[0], cards[1]],
        [cards[2], cards[3]],
        [cards[4], cards[5]]
    ]);
    pairsFoundByPlayers.set(players[1], []);
    pairsFoundByPlayers.set(players[2], [
        [cards[8], cards[9]],
        [cards[10], cards[11]]
    ]);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 0);
});

test("gameUtils should identify that there is no winner yet when" +
    " game setup is: total pairs: 4; 2, 0, 1", (t) => {
    t.plan(1);

    const cards = cardsGenerator.generate(8);
    const players = playersGenerator.generate(3);
    const pairsFoundByPlayers = new Map();

    pairsFoundByPlayers.set(players[0], [
        [cards[0], cards[1]],
        [cards[2], cards[3]]
    ]);
    pairsFoundByPlayers.set(players[1], []);
    pairsFoundByPlayers.set(players[2], [
        [cards[4], cards[5]]
    ]);

    const winners = gameUtils.getWinners({
        cards,
        pairsFoundByPlayers
    });

    t.equal(winners.length, 0);
});
