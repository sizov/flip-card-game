import test from "tape";
import gameUtils from "../../src/utils/gameUtils";
import gameStates from "../../src/constants/gameStates";
import Card from "../../src/Card";
import Player from "../../src/Player";

function getFlippedCard(options) {
    var card = new Card(options);
    card.flip();
    return card;
}

test("gameUtils should identify that game is in DRAW state when all cards have been flipped " +
    "and all players have same amount of found pairs", (t) => {
    t.plan(1);

    const card0 = getFlippedCard({id: '0', pardId: '0'});
    const card1 = getFlippedCard({id: '1', pardId: '0'});
    const card2 = getFlippedCard({id: '2', pardId: '1'});
    const card3 = getFlippedCard({id: '3', pardId: '1'});
    const cards = [card0, card1, card2, card3];
    const cardsFlippedByPlayers = [card0, card1, card2, card3];

    const playerA = new Player({id: '0'});
    const playerB = new Player({id: '1'});

    const cardPairsFoundByPlayers = new Map();
    cardPairsFoundByPlayers.set(playerA, [card0, card1]);
    cardPairsFoundByPlayers.set(playerB, [card2, card3]);

    t.equal(gameUtils.getGameState({cards, cardPairsFoundByPlayers, cardsFlippedByPlayers}), gameStates.DRAW);
});

test("gameUtils should identify that game is in OVER state when all cards have been flipped " +
    "and one players has larger amount of found pairs", (t) => {
    t.plan(1);

    const card0 = getFlippedCard({id: '0', pardId: '0'});
    const card1 = getFlippedCard({id: '1', pardId: '0'});
    const card2 = getFlippedCard({id: '2', pardId: '1'});
    const card3 = getFlippedCard({id: '3', pardId: '1'});
    const cards = [card0, card1, card2, card3];
    const cardsFlippedByPlayers = [card0, card1, card2, card3];

    const playerA = new Player({id: '0'});
    const playerB = new Player({id: '1'});

    const cardPairsFoundByPlayers = new Map();
    cardPairsFoundByPlayers.set(playerA, [card0, card1, card2, card3]);
    cardPairsFoundByPlayers.set(playerB, []);

    t.equal(gameUtils.getGameState({cards, cardPairsFoundByPlayers, cardsFlippedByPlayers}), gameStates.OVER);
});

test("gameUtils should identify that game is in PLAYING state when all cards have NOT been flipped", (t) => {
    t.plan(1);

    const card0 = getFlippedCard({id: '0', pardId: '0'});
    const card1 = getFlippedCard({id: '1', pardId: '0'});
    const card2 = getFlippedCard({id: '2', pardId: '1'});
    const card3 = getFlippedCard({id: '3', pardId: '1'});
    const cards = [card0, card1, card2, card3];
    const cardsFlippedByPlayers = [card0, card1];

    const playerA = new Player({id: '0'});
    const playerB = new Player({id: '1'});

    const cardPairsFoundByPlayers = new Map();
    cardPairsFoundByPlayers[playerA] = [card0, card1];
    cardPairsFoundByPlayers[playerB] = [];

    t.equal(gameUtils.getGameState({cards, cardPairsFoundByPlayers, cardsFlippedByPlayers}), gameStates.PLAYING);
});

test("gameUtils should identify that game is in NEW state when none of the players made moves", (t) => {
    t.plan(1);
    t.equal(gameUtils.getGameState({cardsFlippedByPlayers: []}), gameStates.NEW);
});

