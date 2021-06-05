/* PSEUDO CODE FOR PROJECT 1 */

/*----- constants -----*/
//Define a class that states the values of each card in terms of points.
//Define the array of cards containing 52 cards.
const sortedDeck = [
'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'cJ', 'cQ', 'cK', 'cA', /* clubs */
's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 'sJ', 'sQ', 'sK', 'sA', /* spades */
'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'dJ', 'dQ', 'dK', 'dA', /* diamonds */
'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'hJ', 'hQ', 'hK', 'hA', /* hearts */];

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
  playerHand = [];
  dealerHand = [];
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
  let newDeck = sortedDeck;
  newDeck = newDeck.forEach()

}
    //In the manageDeck function, create a clone of the cardsArray constant.
    //Until the clone is empty, generate a random number between 0 and the cardsArrayClone.length.
    //Pop the random values into a new array, which will be the output.

//Create helper function to deal out starting hands
function dealStartHands() {}
    //Pop the last two elements of the shuffledCards array into the dealersHand array
    //Pop the last two elements of the shuffledCards array into the dealersHand array

//Create helper function to determine the sum of an array. Accept an array as the sole argument
function sumArray() {}
    //Create a new array substituting the card literal with its points.
    //Sum up the new array, and apply to new Variable called cardTotal
    //if the hand has the Ace of Diamonds and the cardTotal is over 21, reduce points by 10.
    //if the hand has the Ace of Hearts and the cardTotal is over 21, reduce points by 10.
    //if the hand has the Ace of Spades and the cardTotal is over 21, reduce points by 10.
    //if the hand has the Ace of Clubs and the cardTotal is over 21, reduce points by 10.
    //Return cardTotal

//Create helper function to check win conditions with two variables being arguments (playerTotal, dealerTotal)
function checkWinCons (playerTotal, dealerTotal) {}
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
function render() {}
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