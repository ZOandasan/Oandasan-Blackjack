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

  

}

function render(){
  determinePoints();
}

function pressHit(){

}

function pressStand(){

}