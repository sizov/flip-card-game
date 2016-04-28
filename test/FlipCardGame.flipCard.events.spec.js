import test from "tape";
import FlipCardGame from "../src/FlipCardGame";
import Card from "../src/Card";
import Player from "../src/Player";
import cardStates from "../src/constants/cardStates";
import gameEvents from "../src/constants/gameEvents";

test('FlipCardGame', (t) => {
    var card0;
    var card1;
    var card2;
    var card3;
    var card4;
    var card5;

    var player0;
    var player1;

    function resetCardsAndPlayers() {
        card0 = new Card({id: '0', pairId: '0'});
        card1 = new Card({id: '1', pairId: '0'});
        card2 = new Card({id: '2', pairId: '1'});
        card3 = new Card({id: '3', pairId: '1'});
        card4 = new Card({id: '4', pairId: '2'});
        card5 = new Card({id: '5', pairId: '2'});

        player0 = new Player();//if you add ID it works!!!
        player1 = new Player();
    }

    function getNewGame4Cards() {
        resetCardsAndPlayers();
        return new FlipCardGame({
            cards: [card0, card1, card2, card3],
            players: [player0, player1]
        });
    }

    function getNewGame6Cards() {
        resetCardsAndPlayers();
        return new FlipCardGame({
            cards: [card0, card1, card2, card3, card4, card5],
            players: [player0, player1]
        });
    }

    t.test("should fire PLAYER_FINISHED_FLIPPING_PAIR_EVENT" +
        " event " +
        "when player flipped two cards", (t) => {
        t.plan(3);

        const game = getNewGame4Cards();

        game.on(gameEvents.PLAYER_FINISHED_FLIPPING_PAIR_EVENT, function (event) {
            t.equal(event.player, player0);
            t.equal(event.cards[0], card0);
            t.equal(event.cards[1], card2);
        });

        game.flipCard({
            card: card0,
            player: player0
        });

        game.flipCard({
            card: card2,
            player: player0
        });
    });

    t.test("should fire PLAYER_FOUND_PAIR_EVENT event when player " +
        "flipped two cards and their IDs are same", (t) => {
        t.plan(3);

        const game = getNewGame4Cards();

        game.on(gameEvents.PLAYER_FOUND_PAIR_EVENT, function (event) {
            t.equal(event.player, player0);
            t.equal(event.cards[0], card0);
            t.equal(event.cards[1], card1);
        });

        game.flipCard({
            card: card0,
            player: player0
        });

        game.flipCard({
            card: card1,
            player: player0
        });
    });

    t.test("should fire GAME_OVER event when one player found more" +
        " pairs than others and there are no way for others to win", (t) => {
        t.plan(1);

        const game = getNewGame6Cards();

        game.on(gameEvents.GAME_OVER_EVENT, function (event) {
            t.equal(event.winner, player0);
        });

        game.flipCard({
            card: card0,
            player: player0
        });

        game.flipCard({
            card: card1,
            player: player0
        });

        game.flipCard({
            card: card2,
            player: player1
        });

        game.flipCard({
            card: card4,
            player: player1
        });

        game.flipCard({
            card: card2,
            player: player0
        });

        game.flipCard({
            card: card3,
            player: player0
        });
    });


    t.test("should fire GAME_DRAW_EVENT event when two player found same" +
        " amount of pairs and there are no way for others to win", (t) => {
        t.plan(2);

        const game = getNewGame4Cards();

        game.on(gameEvents.GAME_DRAW_EVENT, function (event) {
            t.equal(event.winners[0], player0);
            t.equal(event.winners[1], player1);
        });

        game.flipCard({
            card: card0,
            player: player0
        });

        game.flipCard({
            card: card1,
            player: player0
        });

        game.flipCard({
            card: card2,
            player: player1
        });

        game.flipCard({
            card: card3,
            player: player1
        });
    });


});

test("FlipCardGame should fire CARD_FLIP_EVENT event when cards flipped", (t) => {
    t.plan(2);

    var game = new FlipCardGame();

    const players = game.getPlayers();
    const player0 = players[0];

    const cards = game.getCards();
    const card0 = cards[0];

    game.on(gameEvents.CARD_FLIP_EVENT, function (event) {
        t.equal(event.card.getState(), cardStates.FACE);
        t.equal(event.card.getId(), card0.getId());
    });

    game.flipCard({
        card: card0,
        player: player0
    });

});
