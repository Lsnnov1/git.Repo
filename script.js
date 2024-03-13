const gameContainer = document.getElementById("game");
let card1 = "";
let card2 = "";
let clickDelayed = false;
let flippedCards = 0;
let resetBtn = document.getElementById('reset')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // gameContainer.addEventListener("click", countDown(30))

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

  }
}

// TODO: Implement this function!

function handleCardClick(event) {
  // USE DELAY CLICK
  if (clickDelayed === true) return;

  // TURN EVENT.TARGET INTO EASIER TO USE VARIABLE
  let currentCard = event.target;

  // MATCH COLOR TO CLASS USING JS STYLE
  currentCard.style.backgroundColor = currentCard.classList[0]
  
//  IF NOT EITHER CARD 1 OR 2
  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }
// IF BOTH CARDS ARE FLIPPED
  if (card1 && card2) {
    // DELAY CLICKING
    clickDelayed = true;
    let card1Class = card1.className;
    let card2Class = card2.className;
  
  // IF BOTH CARDS ARE EQUAL 
  if (card1Class === card2Class) {
    // WILL NOT RESET 
    flippedCards += 2;
    // REMOVE BOTH EVENT LISTENERS AND RESET CARD VALUES
    card1.removeEventListener("click", handleCardClick);
    card1 = null;
    card2.removeEventListener("click", handleCardClick);
    card2 = null;
    // RESET CLICK DELAY
    clickDelayed = false;
  } else { 
    // ELSE CARDS DONT MATCH, RESET COLORS 
    // SET TIMED FUNCTION TO RESET
    setTimeout(function() {
      // RESET STYLES AND REMOVE CLASSES
      card1.style.backgroundColor = "";
      card1.classList.remove("flipped");
      card2.style.backgroundColor = "";
      card2.classList.remove("flipped");
      // RESET VALUES
      card1 = null;
      card2 = null;
      // CLICK AGAIN
      clickDelayed = false;
      // TIME SET TO 650MS
    }, 650);
  }
}
  
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (flippedCards === COLORS.length) alert("YOU WIN!!!!");
}
// ADDING RESET BUTTON 
resetBtn.addEventListener('click', function(e){
  if (e.target === "BUTTON") {  
    gameContainer.reset()
  }
})
// when the DOM loads
createDivsForColors(shuffledColors);

// SET A 45 SECOND TIMER TO RESET FORM AFTER FIRST CLICK

// function countDown(time){
//   let timer = setInterval(function(){
//     time--;
//     if(time <= 0){
//       clearInterval(timer);

//       return;
//     }
//     else {
//       console.log(time);
//     }

//   },1000)
// }



// - Add a button that when clicked will start the game
// - Add a button that when clicked will restart the game once it has ended
// - For every guess made, increment a score variable and display the score while the game is played
// - Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
// - Allow for any number of cards to appear
// - Instead of hard-coding colors, try something different like random colors or even images!