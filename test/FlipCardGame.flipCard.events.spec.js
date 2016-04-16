import test from "tape";
import FlipCardGame from "../src/FlipCardGame";
import Card from "../src/Card";
import Player from "../src/Player";
import cardStates from "../src/constants/cardStates";
import gameStates from "../src/constants/gameStates";
import gameEvents from "../src/constants/gameEvents";

test('FlipCardGame', (t) => {
    const card0 = new Card({id: '0', pairId: '0'});
    const card1 = new Card({id: '1', pairId: '0'});
    const card2 = new Card({id: '2', pairId: '1'});
    const card3 = new Card({id: '3', pairId: '1'});

    const player0 = new Player();
    const player1 = new Player();

    function getNewSimpleGame() {
        return new FlipCardGame({
            cards: [card0, card1, card2, card3],
            players: [player0, player1]
        });
    }

    t.test("should fire PLAYER_FINISHED_FLIPPING_PAIR_EVENT" +
        " event " +
        "when player flipped two cards", (t) => {
        t.plan(3);

        const game = getNewSimpleGame();

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

        const game = getNewSimpleGame();

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


//test("FlipCardGame should fire GAME_OVER_EVENT event when there is a winner", (t) => {
//    t.plan(2);
//
//    var game = new FlipCardGame({cardsAmount: 2});
//
//    const players = game.getPlayers();
//    const player0 = players[0];
//    const player1 = players[1];
//
//    const cards = game.getCards();
//    const card0 = cards[0];
//    const card1 = cards[1];
//
//    game.on(gameEvents.GAME_OVER_EVENT, function (event) {
//        t.equal(event.winnerPlayer, player1);
//    });
//
//    game.flipCard({card: card0, player: player0});
//    game.flipCard({card: card0, player: player1});
//    game.flipCard({card: card0, player: player0});
//    game.flipCard({card: card1, player: player1});
//
//});
