/* PSEUDO CODE FOR PROJECT 1 */

/*----- constants -----*/
//Define a class that states the values of each card in terms of points.
//Define the array of cards containing 52 cards.
const sortedDeck = [
'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'cT', 'cJ', 'cQ', 'cK', 'cA', /* clubs */
's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 'sT', 'sJ', 'sQ', 'sK', 'sA', /* spades */
'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'dT', 'dJ', 'dQ', 'dK', 'dA', /* diamonds */
'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'hT', 'hJ', 'hQ', 'hK', 'hA', /* hearts */];

/*----- app's state (variables) -----*/
//Define an empty array called shuffledDeck
let shuffledDeck;
//Define an empty array called dealerHand
let dealerHand;
//Define an empty array called playerHand
let playerHand;
//Define a variable called dealerTotal
let dealerTotal;
//Define a variable called playerTotal
let playerTotal;
//Define a variable called gameState
let gameState;

//Define a variable called playerWins
let playerWins = 0;
//Define a veriable called dealerWins
let dealerWins = 0;

/*----- cached element references -----*/
//Cash the Win/Loss Ratio header
const winLossElem = document.getElementById('win_loss');
//Cash the current total element
const currentTotalElem = document.getElementById('player_total');
//Cash the Hit Me & Stand & Reset Game buttons
const hitButtonElem = document.getElementById('btn_hit');
const standButtonElem = document.getElementById('btn_stand');
const resetButtonElem = document.getElementById('btn_reset');
//Cash the Two DIV elements that will be storing the card images

/*----- event listeners -----*/
//Deal with the button event listeners
document.querySelector('#btn_reset').addEventListener('click', initialize);//reset game goes to the initialize function
document.querySelector('#btn_hit').addEventListener('click', pressHit); //Hit me goes to the Hit me button pressed function
document.querySelector('#btn_stand').addEventListener('click', pressStand); //Stand goes to the stand button pressed function

/*----- functions -----*/
//Call Initialize Function
initialize();

//Initialize the state variables in the initialize function.
function initialize(){
  //Set playerHand and dealerHand as empty arrays
  dealerHand = [];
  playerHand = [];
  //set reset button property to hidden
  if (gameState === 0){
    resetButtonElem.style.visibility = 'hidden';
  } else {
    resetButtonElem.style.visibility = 'visible';
  }
  //Set the shuffledCards array as the result of the manage Deck of cards function.
  shuffledDeck = manageDeck();
  //Call the function that deals out starting hands
  dealStartHands();
  //Call the render Function
  render();
}    

//Create helper function to manage the deck of cards
function manageDeck() {
  //In the manageDeck function, create a clone of the cardsArray constant.
  let tempDeck = sortedDeck;
  let shuffledArr = [];
  //Until the clone is empty, generate a random number between 0 and the cardsArrayClone.length.
  while (tempDeck.length > 0){
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    //Splice the random values into a new array, which will be the output.
    shuffledArr.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return shuffledArr;
}
    
//Create helper function to deal out starting hands
function dealStartHands() {
  //Pop the last two elements of the shuffledCards array into the playerHand array
  playerHand.push(shuffledDeck.pop());
  playerHand.push(shuffledDeck.pop());
  //Pop the last two elements of the shuffledCards array into the dealerHand array
  dealerHand.push(shuffledDeck.pop());
  dealerHand.push(shuffledDeck.pop());
}
    
function deterinePoints() {
  playerTotal = 0;
  dealerTotal = 0;
  //Create a function substituting the card literal with its points.
  function isolateValue(card){
    let cardValue = card.split('');
    let value = cardValue.pop();
    console.log('Value = ' + value);
    if (value === 'A') {
      return 11;
    } else if (value === '9') {
      return 9;
    } else if (value === '8') {
      return 8;
    } else if (value === '7') {
      return 7;
    } else if (value === '6') {
      return 6;
    } else if (value === '5') {
      return 5;
    } else if (value === '4') {
      return 4;
    } else if (value === '3') {
      return 3;
    } else if (value === '2') {
      return 2;
    } else {
      return 10;
    }
  }
  
  playerHand.forEach(function(card){
    //Sum up the points, and apply to playerTotal
    playerTotal += isolateValue(card);
    //Handle Aces
    console.log(playerTotal);
    if (playerHand.some(function(card){ return card === 'cA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
    if (playerHand.some(function(card){ return card === 'dA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
    if (playerHand.some(function(card){ return card === 'hA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
    if (playerHand.some(function(card){ return card === 'sA' }) && playerTotal > 21 ){
      playerTotal -= 10; 
    }
  });
  
  
  dealerHand.forEach(function(card){
    //Sum up the points, and apply to playerTotal
    dealerTotal += isolateValue(card);
    //Handle Aces
    console.log(dealerTotal);
    if (dealerHand.some(function(card){ return card === 'cA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
    if (dealerHand.some(function(card){ return card === 'dA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
    if (dealerHand.some(function(card){ return card === 'hA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
    if (dealerHand.some(function(card){ return card === 'sA' }) && dealerTotal > 21 ){
      dealerTotal -= 10; 
    }
  });
}

//Create helper function to check win conditions with two variables being arguments (playerTotal, dealerTotal)
function checkWinCons () {}
    //if playerTotal is greater than 21, set the game state equal to 'dealer wins'
    //else if the dealerTotal is greater than 21, set the game state equal to 'player wins'
    //else if gamestate is 'waiting to compare' compare the totals of player and dealer. 
      //If the player is higher than dealer, set the game state equal to 'player wins'
      //else, set the game state equal to 'dealer wins'
//

//Create a helper function to calculate and display win loss ratio
function handleWinLoss() {}
    //if gameState = playerWins
      //playerWins adds one
    //else if gameState = dealerWins
      //dealerWins adds one
    //create an array with two values of [playerWins, dealerWins]
    //set the Win Loss ratio header to a string of 'playerWins : dealerWins'

//Create a render function to apply the values to the interface.
function render() {
  deterinePoints();
}
    //set DealerTotal equal to sumOfArray function with the dealers hand as the argument
    //set PlayerTotal equal to sumOfArray function with the players hand as the argument
    //assign images based on each of the values in playersHand
    //assign images based on each of the values in dealersHand
    //call checkWinCons function with the playersHand
    //If the gamestate is 'dealer wins'
      //callEndgame Function with argument of 'dealer wins'
    //else if the gamestate is 'player wins'
      //callEndgame Function with argument of 'player wins'

//Create a function when the hit Me button is pressed
function pressHit() {}
    //pop an element from the shuffled cards array into the playersHand
    //call render function

//Create a function when the stand button is pressed
function pressStand() {}
    //while dealerTotal < 17 Do
      //pop an element from the shuffled cards array into the dealersHand
      //call render function
    //set gamestate is 'waiting to compare'
    //render

//Create an endgame function
function endGame() {}
    //disable hit-me and stand buttons
    //set reset game button property to visible
    //call calculate win loss ration function


/* Mustafa, Taylor, Henry, & Andy also have Blackjack */