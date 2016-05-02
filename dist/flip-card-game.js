(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("wolfy87-eventemitter"));
	else if(typeof define === 'function' && define.amd)
		define(["wolfy87-eventemitter"], factory);
	else if(typeof exports === 'object')
		exports["flip-card-game"] = factory(require("wolfy87-eventemitter"));
	else
		root["flip-card-game"] = factory(root["wolfy87-eventemitter"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_12__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _FlipCardGame = __webpack_require__(6);

	var _FlipCardGame2 = _interopRequireDefault(_FlipCardGame);

	var _cardStates = __webpack_require__(1);

	var _cardStates2 = _interopRequireDefault(_cardStates);

	var _gameEvents = __webpack_require__(2);

	var _gameEvents2 = _interopRequireDefault(_gameEvents);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    FlipCardGame: _FlipCardGame2.default,
	    cardStates: _cardStates2.default,
	    events: _gameEvents2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    FACE: 'face',
	    BACK: 'back'
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    CARD_FLIP_EVENT: 'cardFlipEvent',
	    PLAYER_FOUND_PAIR_EVENT: 'playerFoundPairEvent',
	    PLAYER_FINISHED_FLIPPING_PAIR_EVENT: 'playerFinishedFlippingPairEvent',
	    GAME_OVER_EVENT: 'gameOverEvent',
	    GAME_DRAW_EVENT: 'gameDrawEvent'
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    OVER: 'gameOver',
	    DRAW: 'drawGame',
	    PLAYING: 'playingGame',
	    NEW: 'newGame'
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _idGenerator = __webpack_require__(10);

	var _idGenerator2 = _interopRequireDefault(_idGenerator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (state) {
	    return {
	        getId: function getId() {
	            return typeof state.id === 'undefined' ? _idGenerator2.default.generate() : state.id;
	        }
	    };
	}; //FIXME: use id generator to get IDs by default

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cardStates = __webpack_require__(1);

	var _cardStates2 = _interopRequireDefault(_cardStates);

	var _HasId = __webpack_require__(4);

	var _HasId2 = _interopRequireDefault(_HasId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULT_OPTIONS = {
	    id: undefined,

	    state: _cardStates2.default.BACK,

	    /**
	     * Each picture on the card has pair in the game.
	     * This field stores an id of pair (the second card of the pair will have same id)
	     */
	    pairId: undefined
	};

	function Card(options) {
	    options = Object.assign({}, DEFAULT_OPTIONS, options);

	    var getState = function getState() {
	        return options.state;
	    };
	    var getPairId = function getPairId() {
	        return options.pairId;
	    };

	    function setState(value) {
	        if (value !== _cardStates2.default.BACK && value !== _cardStates2.default.FACE) {
	            throw new Error('Unexpected state ' + value);
	        }

	        options.state = value;
	    }

	    function flip() {
	        if (options.state === _cardStates2.default.FACE) {
	            setState(_cardStates2.default.BACK);
	        } else if (options.state === _cardStates2.default.BACK) {
	            setState(_cardStates2.default.FACE);
	        }
	    }

	    return Object.assign({}, (0, _HasId2.default)({ id: options.id }), {
	        getState: getState,
	        setState: setState,
	        getPairId: getPairId,
	        flip: flip
	    });
	}

	exports.default = Card;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _gameStates = __webpack_require__(3);

	var _gameStates2 = _interopRequireDefault(_gameStates);

	var _gameEvents = __webpack_require__(2);

	var _gameEvents2 = _interopRequireDefault(_gameEvents);

	var _gameUtils = __webpack_require__(9);

	var _gameUtils2 = _interopRequireDefault(_gameUtils);

	var _cardsGenerator = __webpack_require__(8);

	var _cardsGenerator2 = _interopRequireDefault(_cardsGenerator);

	var _playersGenerator = __webpack_require__(11);

	var _playersGenerator2 = _interopRequireDefault(_playersGenerator);

	var _wolfy87Eventemitter = __webpack_require__(12);

	var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULT_OPTIONS = {
	    playersAmount: 2,
	    cardsAmount: 10
	};

	function FlipCardGame(options) {
	    options = Object.assign({}, DEFAULT_OPTIONS, options);

	    var eventEmitter = new _wolfy87Eventemitter2.default();
	    this.on = eventEmitter.on.bind(eventEmitter);
	    this.emit = eventEmitter.emit.bind(eventEmitter);

	    /**
	     * State of the game - is it new game, in process or finished
	     */
	    this.getState = function () {
	        return _gameUtils2.default.getGameState({ cards: cards, cardsFlippedByPlayers: cardsFlippedByPlayers, pairsFoundByPlayers: pairsFoundByPlayers, currentPlayer: currentPlayer });
	    };

	    /**
	     * Player who turns cards now
	     */
	    var currentPlayer;
	    this.getCurrentPlayer = function () {
	        return currentPlayer;
	    };

	    /**
	     * Pair of cards that is currently flipped by player
	     */
	    var currentFlippedPair = [];

	    /**
	     * Players that play the game
	     */
	    var players = options.players || _playersGenerator2.default.generate(options.playersAmount);
	    this.getPlayers = function () {
	        return players;
	    };

	    /**
	     * All cards of the game
	     */
	    var cards = options.cards || _cardsGenerator2.default.generate(options.cardsAmount);
	    this.getCards = function () {
	        return cards;
	    };

	    var pairsFoundByPlayers = new Map();
	    var cardsFlippedByPlayers = new Map();

	    function emitPossibleGameEndEvents(gameState) {
	        if (gameState.state === _gameStates2.default.OVER) {
	            eventEmitter.emit(_gameEvents2.default.GAME_OVER_EVENT, {
	                winner: gameState.winners[0]
	            });
	        } else if (gameState.state === _gameStates2.default.DRAW) {
	            eventEmitter.emit(_gameEvents2.default.GAME_DRAW_EVENT, {
	                winners: gameState.winners
	            });
	        }
	    }

	    /**
	     * Method to make a move by player.
	     * This method changes the state of game by flipping a card.
	     * @param options
	     * - player Player (instance) who makes current move
	     * - playerId Alternative to passing Player instance - you can pass ID of
	     * Player instance
	     * - card Card (instance) which passed player wants to flip
	     * - card Alternative to passing Card instance) - you can pass ID of
	     * Card instance
	     */
	    this.flipCard = function (options) {
	        options = options || {};

	        var card = _gameUtils2.default.getCardToFlip({
	            cardId: options.cardId,
	            card: options.card,
	            cards: cards
	        });

	        currentPlayer = _gameUtils2.default.getPlayerToFlipCard({
	            playerId: options.playerId,
	            player: options.player,
	            currentPlayer: currentPlayer,
	            players: players,
	            cardsFlippedByPlayers: cardsFlippedByPlayers
	        });

	        card.flip();
	        cardsFlippedByPlayers.get(currentPlayer).push(card);
	        currentFlippedPair.push(card);
	        eventEmitter.emit(_gameEvents2.default.CARD_FLIP_EVENT, {
	            card: card,
	            player: currentPlayer
	        });

	        //if pair has been flipped, time to check it
	        if (currentFlippedPair.length === 2) {
	            if (_gameUtils2.default.cardsArePair(currentFlippedPair[0], currentFlippedPair[1])) {
	                eventEmitter.emit(_gameEvents2.default.PLAYER_FOUND_PAIR_EVENT, { cards: currentFlippedPair, player: currentPlayer });
	                pairsFoundByPlayers.get(currentPlayer).push(currentFlippedPair.slice());
	            } else {
	                //we need to flip back cards if pair has not been found
	                currentFlippedPair[0].flip();
	                currentFlippedPair[1].flip();
	            }

	            eventEmitter.emit(_gameEvents2.default.PLAYER_FINISHED_FLIPPING_PAIR_EVENT, { cards: currentFlippedPair, player: currentPlayer });

	            currentFlippedPair = [];
	        }

	        emitPossibleGameEndEvents(this.getState());

	        if (currentFlippedPair.length === 2) {
	            currentPlayer = undefined;
	        }
	    };

	    players.forEach(function (player) {
	        pairsFoundByPlayers.set(player, []);
	        cardsFlippedByPlayers.set(player, []);
	    });
	}

	exports.default = FlipCardGame;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _HasId = __webpack_require__(4);

	var _HasId2 = _interopRequireDefault(_HasId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DEFAULT_OPTIONS = {
	    id: undefined
	};

	function Player(options) {
	    options = Object.assign({}, DEFAULT_OPTIONS, options);

	    return Object.assign({}, (0, _HasId2.default)({ id: options.id }));
	}

	exports.default = Player;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Card = __webpack_require__(5);

	var _Card2 = _interopRequireDefault(_Card);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generate(amount) {
	    if (amount < 0) {
	        throw new Error('Amount should not be less than zero');
	    }

	    var cards = [],
	        pairId = 0;

	    for (var i = 0; i < amount; i++) {
	        cards.push(new _Card2.default({
	            pairId: pairId.toString()
	        }));

	        if (i % 2 !== 0) {
	            pairId = pairId + 1;
	        }
	    }

	    return cards;
	}

	exports.default = {
	    generate: generate
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _cardStates = __webpack_require__(1);

	var _cardStates2 = _interopRequireDefault(_cardStates);

	var _gameStates = __webpack_require__(3);

	var _gameStates2 = _interopRequireDefault(_gameStates);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Gets next valid player for the move. Checks which player made less moves
	 */
	function getNextValidPlayer() {}

	function getNextRandomCard() {}

	function isValidPlayerToDoFlip() {
	    //TODO: make sure that this player has not flipped more than 2 cards than others players
	    return true;
	}

	function getObjectByOptions(options) {
	    var filterByInstance = function filterByInstance(object) {
	        return object === options.object;
	    };
	    var filterById = function filterById(object) {
	        return object.getId() === options.id;
	    };
	    var filterFn = typeof options.id !== 'undefined' ? filterById : filterByInstance;

	    var foundObjects = options.objects.filter(filterFn);
	    if (foundObjects.length === 0) {
	        throw new Error("Error finding object");
	    }

	    return foundObjects[0];
	}

	function getPlayerToFlipCard(options) {
	    options = options || {};

	    //TODO: control the amount of moves - only two moves per player

	    var player;

	    if (options.player || options.playerId) {
	        player = getObjectByOptions({
	            id: options.playerId,
	            object: options.player,
	            objects: options.players
	        });
	    } else {
	        player = getNextValidPlayer();
	    }

	    if (!isValidPlayerToDoFlip(player)) {
	        throw new Error("Player " + player.getId() + " can't flip cards now");
	    }

	    if (!player) {
	        throw new Error('Error finding next valid player');
	    }

	    return player;
	}

	function getCardToFlip(options) {
	    options = options || {};

	    var card;
	    if (options.card || options.cardId) {
	        card = getObjectByOptions({
	            id: options.cardId,
	            object: options.card,
	            objects: options.cards
	        });
	    } else {
	        card = getNextRandomCard();
	    }

	    if (!card) {
	        throw new Error('Error finding next card to flip');
	    }

	    if (card.getState() === _cardStates2.default.FACE) {
	        throw new Error("Error flipping card " + card.getId() + " as it is flipped already");
	    }

	    return card;
	}

	/**
	 * Checks amount of card pairs found bvy each player and calculates which player(s) has(ve)
	 * most amount of card pairs found
	 * @returns {Array}
	 * @param options
	 */
	function getWinners(options) {
	    //when there are 6 cards and someone found 2 pairs, there is no chance
	    //for other person to win!
	    var totalPairs = Math.floor(options.cards.length / 2);
	    var pairsRequiredToWinImmediately = Math.floor(totalPairs / 2) + 1;
	    var playersByFoundPairsAmount = new Map();
	    var pairsFound = 0;
	    var maxFoundPairsAmount = 0;

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = options.pairsFoundByPlayers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 2);

	            var player = _step$value[0];
	            var pairsFoundByPlayer = _step$value[1];

	            var pairsAmountFoundByPlayer = pairsFoundByPlayer.length;

	            pairsFound += pairsAmountFoundByPlayer;

	            if (pairsAmountFoundByPlayer >= pairsRequiredToWinImmediately) {
	                return [player];
	            }

	            if (pairsAmountFoundByPlayer > maxFoundPairsAmount) {
	                maxFoundPairsAmount = pairsAmountFoundByPlayer;
	            }

	            if (!playersByFoundPairsAmount.has(pairsAmountFoundByPlayer)) {
	                playersByFoundPairsAmount.set(pairsAmountFoundByPlayer, []);
	            }

	            playersByFoundPairsAmount.get(pairsAmountFoundByPlayer).push(player);
	        }

	        //TODO: take into account order of moves, you can identify game state
	        // earlier
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    var remainingPairs = totalPairs - pairsFound;
	    var playersWithMaxFoundPairs = playersByFoundPairsAmount.get(maxFoundPairsAmount);

	    //identifying draw
	    if (remainingPairs === 0) {
	        return playersWithMaxFoundPairs.slice();
	    }

	    //if there are unfound pairs and more than 1 player with maximum amount
	    // of found cards - any of them can win and we can't find winner now
	    if (playersWithMaxFoundPairs.length > 1) {
	        //if remaining pairs amount + pairs found by anyone is less
	        // than max, max won
	        return [];
	    }

	    //now we need to understand if single player who has more cards than others
	    // leaves any chances to others
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	        for (var _iterator2 = playersByFoundPairsAmount[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _step2$value = _slicedToArray(_step2.value, 1);

	            var pairsAmount = _step2$value[0];

	            //If any other player has chance to get more or equal to max, game
	            // goes on
	            if (pairsAmount + remainingPairs >= maxFoundPairsAmount) {
	                return [];
	            }
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }

	    return playersWithMaxFoundPairs.slice();
	}

	function getGameState(options) {
	    if (!options.currentPlayer) {
	        return { state: _gameStates2.default.NEW };
	    }

	    var winners = getWinners({
	        cards: options.cards,
	        pairsFoundByPlayers: options.pairsFoundByPlayers
	    });

	    if (winners.length === 0) {
	        return { state: _gameStates2.default.PLAYING };
	    }

	    if (winners.length === 1) {
	        return { state: _gameStates2.default.OVER, winners: winners };
	    }

	    return { state: _gameStates2.default.DRAW, winners: winners };
	}

	var cardsArePair = function cardsArePair(cardA, cardB) {
	    return cardA.getPairId() === cardB.getPairId();
	};

	exports.default = {
	    cardsArePair: cardsArePair,
	    getGameState: getGameState,
	    getPlayerToFlipCard: getPlayerToFlipCard,
	    getCardToFlip: getCardToFlip,
	    getWinners: getWinners
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var id = 0;
	function generate() {
	    if (id !== 0) {
	        id = id + 1;
	    }
	    return id.toString();
	}

	exports.default = {
	    generate: generate
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Player = __webpack_require__(7);

	var _Player2 = _interopRequireDefault(_Player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generate(amount) {
	    if (amount < 0) {
	        throw new Error('Amount should not be less than zero');
	    }

	    var players = [];

	    for (var i = 0; i < amount; i++) {
	        players.push(new _Player2.default({
	            id: i
	        }));
	    }

	    return players;
	}

	exports.default = {
	    generate: generate
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }
/******/ ])
});
;