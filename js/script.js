/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
//Render The MasterDeck Constant before any and all commands


/*----- app's state (variables) -----*/
let shuffledDeck;
let dealerHand;
let playerHand;
let dealerTotal;
let playerTotal;
let gameState;

let playerWins = 0;
let dealerWins = 0;

/*----- cached element references -----*/
//Cashe the Text Elements
const winLossElem = document.getElementById('win_loss');
const playerCardsElem = document.getElementById('player_cards');
const dealerCardsElem = document.getElementById('dealer_cards');
const totalElem = document.getElementById('player_total');
//Cashe the Buttons
const hitButtonElem = document.getElementById('btn_hit');
const standButtonElem = document.getElementById('btn_stand');
const resetButtonElem = document.getElementById('btn_reset');

/*----- event listeners -----*/
document.querySelector('#btn_reset').addEventListener('click', initialize);//reset game goes to the initialize function
document.querySelector('#btn_hit').addEventListener('click', pressHit); //Hit me goes to the Hit me button pressed function
document.querySelector('#btn_stand').addEventListener('click', pressStand); //Stand goes to the stand button pressed function

/*----- functions -----*/
initialize();

function initialize(){
  winLossElem.innerText = `Player Wins = ${playerWins} : Dealer Wins = ${dealerWins}`;
  gameState = 0;
  dealerHand = [];
  playerHand = [];
  shuffledDeck = getNewShuffledDeck();
  dealStartHands();
  render();
}

function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
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
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

function dealStartHands(){
   //Pop the last two elements of the shuffledCards array into the playerHand array
  playerHand.push(shuffledDeck.pop());
  playerHand.push(shuffledDeck.pop());
  //Pop the last two elements of the shuffledCards array into the dealerHand array
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
    dealerTotal += card.calue
  });
  handlePlayerAces();
  handleDealerAces();

  //Handle Aces Logic.
  function handlePlayerAces(){
    if (playerHand.some(function(card){ return card.face === 'cA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
    if (playerHand.some(function(card){ return card.face === 'dA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
    if (playerHand.some(function(card){ return card.face === 'hA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
    if (playerHand.some(function(card){ return card.face === 'sA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
  }

  function handleDealerAces(){
    if (dealerHand.some(function(card){ return card.face === 'cA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
    if (dealerHand.some(function(card){ return card.face === 'dA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
    if (dealerHand.some(function(card){ return card.face === 'hA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
    if (dealerHand.some(function(card){ return card.face === 'sA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
  }
}

function handleButtonVisibility(){
  if (gameState === 0){
    resetButtonElem.style.visibility = 'hidden';
    standButtonElem.style.visibility = 'visible';
    hitButtonElem.style.visibility = 'visible';
  } else {
    resetButtonElem.style.visibility = 'visible';
    standButtonElem.style.visibility = 'hidden';
    hitButtonElem.style.visibility = 'hidden';
  }
}

function render(){
  renderDeckInContainer(playerHand, playerCardsElem);
  renderDeckInContainer(dealerHand, dealerCardsElem);
  determinePoints();
  totalElem.innerText = `Player Total: ${playerTotal}`;
  checkWinCons();
  handleWinLoss();
  handleButtonVisibility();
}

function renderDeckInContainer(deck, container){
  container.innerHTML = "";
  let cardsHtml = "";
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  container.innerHTML = cardsHtml;
}

function checkWinCons() {
  //if playerTotal is greater than 21, set the game state equal to 'dealer wins'
  if (playerTotal > 21){
    gameState = 'Dealer Wins';
  } //else if the dealerTotal is greater than 21, set the game state equal to 'player wins'
  else if (dealerTotal > 21){
    gameState = 'Player Wins';
  } //else if gamestate is 'waiting to compare' compare the totals of player and dealer.
  else if (gameState === 'Comparing'){
    if (playerTotal > dealerTotal){
      gameState = 'Player Wins';
    } else if (dealerTotal > playerTotal){
      gameState = 'Dealer Wins';
    } else {
      gameState = 'Tie Game'
    }
  }
}

function handleWinLoss() {
    //Setting Windows to reflect game result
    if (gameState === 'Player Wins'){
      ++playerWins;
      winLossElem.innerText = `Player Wins the Round`;
    } else if (gameState === 'Dealer Wins'){
      ++dealerWins;
      winLossElem.innerText = `Dealer Wins the Round`;
    } else if (gameState === 'Tie Game'){
      winLossElem.innerText = `Tie Game`;
    }
}

function pressHit(){
  if (gameState === 0){
    if (playerTotal < 21){
      playerHand.push(shuffledDeck.pop());
    }
    render();
  }
}

function pressStand(){
  if (gameState === 0){
    while (dealerTotal < 16){
    dealerHand.push(shuffledDeck.pop());
    deterinePoints();
    }
    if (dealerTotal < 22){
      gameState = 'Comparing'
    }
    render();
  }
}