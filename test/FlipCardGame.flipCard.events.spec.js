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
