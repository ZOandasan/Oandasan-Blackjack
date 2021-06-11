/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/
let shuffledDeck;
let dealerHand;
let playerHand;
let dealerTotal;
let playerTotal;
let gameState;

let playerBank;
let playerBid;

/*----- cached element references -----*/
//Cashe the Text Elements
const biddingElem = document.getElementById('bidding');
const playerCardsElem = document.getElementById('player_cards');
const dealerCardsElem = document.getElementById('dealer_cards');
const totalElem = document.getElementById('player_total');
//Cashe the Buttons
const hitButtonElem = document.getElementById('btn_hit');
const standButtonElem = document.getElementById('btn_stand');
const resetButtonElem = document.getElementById('btn_reset');
const betFiveElem = document.getElementById('btn_five');
const betTenElem = document.getElementById('btn_ten');
const betTwentyElem = document.getElementById('btn_twenty');
//Cashe for music
const musicElem = document.getElementById('auto_music');
const checkbox = document.getElementById('music_check');

/*----- event listeners -----*/
document.querySelector('#btn_reset').addEventListener('click', resetGame);//reset game goes to the initialize function
document.querySelector('#btn_hit').addEventListener('click', pressHit); //Hit me goes to the Hit me button pressed function
document.querySelector('#btn_stand').addEventListener('click', pressStand); //Stand goes to the stand button pressed function
checkbox.addEventListener('change', handleMusic);

document.querySelector('#btn_five').addEventListener('click', pressFive);
document.querySelector('#btn_ten').addEventListener('click', pressTen);
document.querySelector('#btn_twenty').addEventListener('click', pressTwenty);


/*----- functions -----*/
initialize();

function runTheGame(){
  gameState = 0;
  biddingElem.innerText = `Player Bank = $ ${playerBank} : Player Bid = $ ${playerBid}`;
  shuffledDeck = getNewShuffledDeck();
  dealStartHands();
  render();
}

function resetGame(){
  playerBid = 0;
  dealerHand = [];
  playerHand = [];
  gameState = "Waiting For Bid";
  biddingElem.innerText = `Player Bank = $ ${playerBank} : Player Bid = $ ${playerBid}`;
  render();
}

function initialize(){
  playerBank = 250;
  resetGame();
}

function getNewShuffledDeck() {
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function buildMasterDeck() {
  const deck = [];
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function dealStartHands(){
  playerHand.push(shuffledDeck.pop());
  playerHand.push(shuffledDeck.pop());
  dealerHand.push(shuffledDeck.pop());
  dealerHand.push(shuffledDeck.pop());
}

function determinePoints(){
  playerTotal = 0;
  dealerTotal = 0;

  playerHand.forEach(function(card){
    playerTotal += card.value;
  });
  dealerHand.forEach(function(card){
    dealerTotal += card.value;
  });
  playerTotal = handleAces(playerHand, playerTotal);
  dealerTotal = handleAces(dealerHand, dealerTotal);

  function handleAces(hand, total){
    hand.forEach(function(card){
      if (card.value > 10 && total > 21){
        total -= 10;
      }
    });
    return total;
  }
}

function renderPlayerHand(){
  playerCardsElem.innerHTML = "";
  let cardsHtml = "";
  playerHand.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  playerCardsElem.innerHTML = cardsHtml;
}

function renderDealerHand(){
  dealerCardsElem.innerHTML = "";
  let dealerHandClone = [...dealerHand];
  dealerHandClone.pop();
  let cardsHtml = `<div class="card back-blue"></div>`;
  dealerHandClone.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  dealerCardsElem.innerHTML = cardsHtml;
}

function renderDealerHandEnd(){
  dealerCardsElem.innerHTML = "";
  let cardsHtml = "";
  dealerHand.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  dealerCardsElem.innerHTML = cardsHtml;
}

function handleTotalElem(){
  if (gameState === "Waiting For Bid") {
    totalElem.innerText = `Please Select Your Bet`;
  } else {
    totalElem.innerText = `Player Total: ${playerTotal}`;
  }
}

function checkWinCons() {
  if (playerTotal > 21){
    gameState = 'Dealer Wins';
  }
  else if (dealerTotal > 21){
    gameState = 'Player Wins';
  }
  else if (gameState === 'Comparing'){
    if (playerTotal > dealerTotal){
      gameState = 'Player Wins';
    } else if (dealerTotal > playerTotal){
      gameState = 'Dealer Wins';
    } else {
      gameState = 'Tie Game'
    }
    renderDealerHandEnd();
  }
}

function handleWinLoss() {
    if (gameState === 'Player Wins'){
      biddingElem.innerText = `Player Wins the Round`;
      playerBank += (playerBid * 2) ;
      playerBid = 0;
    } else if (gameState === 'Dealer Wins'){
      biddingElem.innerText = `Dealer Wins the Round`;
      playerBid = 0;
    } else if (gameState === 'Tie Game'){
      biddingElem.innerText = `Tie Game`;
      playerBank += playerBid
      playerBid = 0;
    }
}

function handleButtonVisibility(){
  if (gameState === 0){
    resetButtonElem.style.visibility = 'hidden';
    standButtonElem.style.visibility = 'visible';
    hitButtonElem.style.visibility = 'visible';
    betFiveElem.style.visibility = 'hidden';
    betTenElem.style.visibility = 'hidden';
    betTwentyElem.style.visibility = 'hidden';
  } else if (gameState === "Waiting For Bid") {
    resetButtonElem.style.visibility = 'hidden';
    standButtonElem.style.visibility = 'hidden';
    hitButtonElem.style.visibility = 'hidden';
    betFiveElem.style.visibility = 'visible';
    betTenElem.style.visibility = 'visible';
    betTwentyElem.style.visibility = 'visible';
  } else {
    resetButtonElem.style.visibility = 'visible';
    standButtonElem.style.visibility = 'hidden';
    hitButtonElem.style.visibility = 'hidden';
    betFiveElem.style.visibility = 'hidden';
    betFiveElem.style.visibility = 'hidden';
    betTenElem.style.visibility = 'hidden';
    betTwentyElem.style.visibility = 'hidden';
  }
}

function render(){
  renderPlayerHand();
  renderDealerHand();
  determinePoints();
  handleTotalElem();
  checkWinCons();
  handleWinLoss();
  handleButtonVisibility();
}

function pressHit(){
  if (gameState === 0){
    if (playerTotal < 21){
      playerHand.push(shuffledDeck.pop());
      render();
    } else if (playerTotal === 21){
      pressStand();
    }
  }
}

function pressStand(){
  if (gameState === 0){
    while (dealerTotal < 16){
    dealerHand.push(shuffledDeck.pop());
    render();
    }
    if (dealerTotal < 22){
      gameState = 'Comparing';
    }
    render();
  }
}

function pressFive(){
  if (playerBank > 4){
    playerBank -= 5;
    playerBid += 5;
    runTheGame();
  }
  
}

function pressTen(){
  if (playerBank > 9){
    playerBank -= 10;
    playerBid += 10;
    runTheGame();
  }
}

function pressTwenty(){
  if (playerBank > 19){
    playerBank -= 20;
    playerBid += 20;
    runTheGame();
  }
}

function handleMusic(){
  if (checkbox.checked) {
    musicElem.play();
  } else {
    musicElem.pause();
  }
}