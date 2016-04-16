import test from "tape";
import FlipCardGame from "../src/FlipCardGame";
import cardStates from "../src/constants/cardStates";
import gameStates from "../src/constants/gameStates";
import gameEvents from "../src/constants/gameEvents";

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
