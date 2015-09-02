
var standButton = document.getElementById("stand-button");
var dealButton = document.getElementById("deal-button");
var downCard = document.getElementById("down-card");
var container = document.getElementById("container");
var dealerCards = document.getElementById("dealer-cards");
var playerCards = document.getElementById("player-cards");
var gameplayButtons = document.getElementById("gameplay-buttons");
var playerTotalDisplay = document.getElementById("player-total");
var dealerTotalDisplay = document.getElementById("dealer-total");
var hitButton = document.getElementById("hit-button");
var display = document.getElementById("display");
var marquee = document.getElementById("marquee");
var dealerHand = [];
var playerHand = [];
var suit;
var value;
var blackjackAmount = 21;

// Create a deck
var suits = ['H', 'D', 'C', 'S'];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var deck = new Array();
for(var i in values) {
  for(var s = 0; s < suits.length; s++) {
    deck.push([suits[s], values[i]]);
  }
}

// I borrowed this array shuffle function from stack overflow 
var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

shuffle(deck);

// deal card from deck
var getCard = function () {
	return deck.pop();
};

// assign card image
var cardImage = function(card) {
	switch (card[0]) {
		case 'H':
			suit = "hearts";
			break;
		case 'D':
			suit = "diamonds";
			break;
		case 'C':
			suit = "clubs";
			break;
		case 'S':
			suit = "spades";
			break;
		default:
			suit = null;
	}
	
	switch (card[1]) {
		case 'J':
			value = 'jack';
			break;
		case 'Q':
			value = 'queen';
			break;
		case 'K':
			value = 'king';
			break;
		case 'A':
			value = 'ace';
			break;
		default:
			value = card[1];
	}
	var newCardImage = "images/cards/" + suit + "_" + value + ".jpg";
	return newCardImage;
};


// Calculate total
var calculateTotal = function(cards) {  // cards is [["H", "3"], ["D", "J"], ... ]
    var arr = cards.map(function(i) {
      return i[1];
    });

    var total = 0;
    arr.map(function(a) {
      if (a == "A")
        total += 11;
      else
        total += (a == "J" || a == "Q" || a == "K") ? 10 : parseInt(a);
    });
    
    var aces = arr.filter(function(values) {
      return values == "A";
    });
    for (i = 0; i < aces.length; i++) {
      if (total > blackjackAmount)
        total -= 10;
    }
    return total;
};

// Create and deal new card to player
var newPlayerCard = function() {
	var playerCard = getCard();
  var newCard = document.createElement("img");
  newCard.src = cardImage(playerCard);
  newCard.style.maxHeight = "200px";
  newCard.style.maxWidth = "100px";
  newCard.style.border = "1px solid";
  newCard.style.marginLeft = "-50px";
  newCard.style.borderRadius = "8px";
  playerCards.appendChild(newCard);
	playerHand.push(playerCard);
  return newCard;
};

// Create and deal new card to dealer
var getNewDealerCard = function() {
	var dealerCard = getCard()
  var newDealerCard = document.createElement("img");
  newDealerCard.id = "topCard";
  newDealerCard.src = cardImage(dealerCard);
  newDealerCard.style.maxHeight = "200px";
  newDealerCard.style.maxWidth = "100px";
  newDealerCard.style.border = "1px solid";
  newDealerCard.style.borderRadius = "8px";
	dealerHand.push(dealerCard);
  calculateTotal(dealerHand);
	return [dealerCard, newDealerCard];
};

// Dealer's second card
var dealerCardHidden = getNewDealerCard();

// Dealer's first card
var dealerCardShowing = getNewDealerCard();

// Show dealer's second card
var showDealerCard = function(card) {
	dealerCards.appendChild(card[1]);
};

// Dealer's face-down card
var newDownCard = function() {
  var downcard = document.createElement("img");
  downcard.id = "down-card";
  downcard.src = "images/cards/cover.jpg";
  downcard.style.maxHeight = "200px";
  downcard.style.maxWidth = "100px";
  downcard.style.border = "1px solid";
  downcard.style.borderRadius = "8px";
  dealerCards.appendChild(downcard);
	return downcard;
};

// Remove dealer's face-down card
var removeDownCard = function() {
	dealerCards.removeChild(dealerCards.childNodes[4]);
};

var createHitButton = function() {
	var hitButton = document.createElement("input");
	hitButton.setAttribute("type", "button");
	hitButton.setAttribute("value", "Hit");
	hitButton.setAttribute("class", "button");
	hitButton.setAttribute("id", "hit-button");
  hitButton.onclick = hit;
	return hitButton;
};



var createStandButton = function() {
	var standButton = document.createElement("input");
  standButton.setAttribute("type", "button");
  standButton.setAttribute("value", "Stand");
  standButton.setAttribute("class", "button");
  standButton.setAttribute("id", "stand-button");
  standButton.onclick = stand;
	return standButton;
};

// Show hit and stay buttons
var showGamePlayButtons = function(hit, stay) {
  // create hit button and append
  gameplayButtons.appendChild(hit);
  // create stand button and append
  gameplayButtons.appendChild(stay);
};

var removeGamePlayButtons = function() {					gameplayButtons.removeChild(gameplayButtons.childNodes[4]);
																				gameplayButtons.removeChild(gameplayButtons.childNodes[3]);
};

var showPlayAgainButton = function() {
  var playAgainButton = document.createElement("a");
  playAgainButton.textContent = "Play Again?";
  playAgainButton.setAttribute("id", "play-again-button"); 
  playAgainButton.setAttribute("class", "button");
  playAgainButton.setAttribute("onclick", "window.location.reload()");
  gameplayButtons.appendChild(playAgainButton);
  return playAgainButton;
};

var dealerTotal = function() {
	return calculateTotal(dealerHand);	
};

var playerTotal = function() {
	return calculateTotal(playerHand);
};

var showPlayerTotal = function() {
	var playerTotalLabel = document.createElement("p");
  playerTotalLabel.textContent = "You";
	playerTotalDisplay.appendChild(playerTotalLabel);
};

var showPlayerTotalValue = function() {
	var playerTotalValue = document.createElement("p");
	playerTotalValue.textContent = playerTotal();
  playerTotalValue.setAttribute("id", "player-total-value");
	playerTotalDisplay.appendChild(playerTotalValue);
};

var removePlayerTotalValue = function() {
  playerTotalDisplay.removeChild(playerTotalDisplay.childNodes[2]);
};

var showMarquee = function(text) {
  var marqueeText = document.createElement("p");
  marqueeText.textContent = text;
  marquee.appendChild(marqueeText);
};

var showDealerTotal = function() {
	var dealerTotalLabel = document.createElement("p");
	dealerTotalLabel.textContent = "Dealer";
	dealerTotalDisplay.appendChild(dealerTotalLabel);
};

var showDealerTotalValue = function() {
	var dealerTotalValue = document.createElement("p");
	dealerTotalValue.textContent = dealerTotal();
	dealerTotalDisplay.appendChild(dealerTotalValue);
};

var removeDealerTotalValue = function() {
  dealerTotalDisplay.removeChild(dealerTotalDisplay.childNodes[2]);
};

var push = function() {
	return "PUSH";
};

var dealerWins = function() {
	return "Dealer Wins";
};

var playerWins = function() {
	return "You Win!";
};

var playerBusts = function() {
	console.log("Busted")
};

var checkForBlackjack = function() {
	if (dealerTotal() == blackjackAmount && playerTotal() == blackjackAmount) { // if both hit blackjack
    showDealerCard(dealerCardHidden)
    showDealerTotal();
    showDealerTotalValue();
    removeDownCard();
    removeGamePlayButtons();
    showGamePlayButtons(playAgainButton());
		showMarquee("Push");
    return true;
	} else if (dealerTotal() == blackjackAmount) {  // if dealer hits blackjack
    showDealerCard(dealerCardHidden);
    showDealerTotal();
    showDealerTotalValue();
    removeDownCard();
    removeGamePlayButtons();
    showPlayAgainButton();
		showMarquee(dealerWins());
    return true;
	} else if (playerTotal() == blackjackAmount) {  // if player hits blackjack
    showDealerCard(dealerCardHidden);
    showDealerTotal();
    showDealerTotalValue();
    removeDownCard();
    removeGamePlayButtons();
    showPlayAgainButton();
		showMarquee(playerWins());
    return true;
	}
};

var compareHands = function() {
  var playersTotal = playerTotal();
  var dealersTotal = dealerTotal();
  if (playersTotal < dealersTotal && dealersTotal <= blackjackAmount) {
    showMarquee("You Lose!");
  }
  else if (playersTotal > dealersTotal) {
    showMarquee("You Win!");
  }
  else if (playersTotal == dealersTotal) {
    showMarquee("Push");
  }
};

var appendDealerCard = function(card) {
  dealerCards.appendChild(card[1]);
};

var dealerTurn = function() {
  calculateTotal(dealerHand);
  if (dealerTotal() == blackjackAmount) {
    compareHands();
    showPlayAgainButton();
  }
  else if (dealerTotal() > blackjackAmount) {
    showMarquee("You Win!");
    showPlayAgainButton();
  } else if (dealerTotal() >= 17) {
    // dealer stays 
    compareHands();
    showPlayAgainButton();
  } else {
    // dealer hits
    appendDealerCard(getNewDealerCard());
    removeDealerTotalValue();
    showDealerTotalValue();
    dealerTurn();
  }
};

var stand = function() {
	removeDownCard();
  showDealerCard(dealerCardHidden);
	showDealerTotal();
	showDealerTotalValue();
	removeGamePlayButtons();
  dealerTurn();
};

var hit = function() {
  newPlayerCard();
  var total = playerTotal();
  if (total > blackjackAmount) {
    removeGamePlayButtons();
    showMarquee("Bust!");
    showPlayAgainButton();
  }
  removePlayerTotalValue();
  showPlayerTotalValue();
};

// Begin gameplay
var deal = function() {
  showDealerCard(dealerCardShowing);
	dealerCardHidden;
  newDownCard();
  newPlayerCard();
  newPlayerCard();
  dealButton.parentNode.removeChild(dealButton);
  showGamePlayButtons(createHitButton(), createStandButton());
	dealerTotal();
	playerTotal();
	showPlayerTotal();
	showPlayerTotalValue();
  checkForBlackjack();
};




dealButton.onclick = deal;
playAgainButton.onclick = location.reload();

