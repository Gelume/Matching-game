 let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
             "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle"];

let openedCard;
let matched;
let movesCounter;
let starsCounter;
let timerId;

function start() {
   clearTimer();

   $(".modal-background").addClass("hide");

   movesCounter = 0;
   $(".moves").text(movesCounter);

   starsCounter = 3;
   $('.fa-star').removeClass("hide");

   matched = [];
   openedCard = "";

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

   let shuffled = shuffle(cards.concat(cards));
   display(shuffled);
   $("li.card").click(open);
 }

 function open(e) {
   startTimer();

   let target = $(e.target);

   // if card is already open return
   if (target.hasClass("open") || target.hasClass("matched")) {
     return;
   }

   // opening the card, getting the card symbol
   target.addClass("open");
   card = target.data("card");

   // if no card open store the new card as opened and return
   if (!openedCard) {
     openedCard = card;
     return;
   }

   // increase move counter
   addMove();

   // if new card is equal to the opened card, register match
   if (openedCard === card) {
     matched.push(card);
     $(".open").addClass("matched").removeClass("open");

     // check victory
     if (matched.length === 8){
       //clearInterval(timerId);
       let time = getGameTime();
       $('#winnerScore').text(`You made ${movesCounter} moves in ${time} and you have ${starsCounter} stars left`);
       $(".modal-background").removeClass("hide");
       $('.modal-close').click(function(){$('.modal-background').addClass("hide")});
       stopTimer();
     }

  // otherwise cards are not matched
   } else {
     $("li.open").addClass("wrong");
     setTimeout(() => $("li.wrong").removeClass("open wrong"), 400);
   }

   // clear opened card
   openedCard = "";

 }

 // functions library
 function display(list) {
   let html = "";

   list.forEach((card) => {
     let cardHtml = `<li class="card" data-card="${card}">`;
     cardHtml += `<i class="fa ${card}"></i>`;
     cardHtml +="</li>";

     html += cardHtml;
   });

   $("ul.deck").html(html);
 }

 // increment the move counter

  function addMove (){
    movesCounter += 1;
    $(".moves").text(movesCounter);

    if (movesCounter === 16 || movesCounter === 24){
      starsCounter--;
      $('.fa-star').not(".fa-star.hide").first().addClass("hide");
    }
  }

 /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// counts time of the game

function startTimer() {
  if (timerId) {
    return;
  }

  let seconds = 0;
  timerId = setInterval(() => {
    seconds += 1;
    displayTimer(seconds);

  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function clearTimer() {
  stopTimer();
  seconds = 0;
  displayTimer(seconds);
}

 // displays time on the score Panel
 function displayTimer(timer) {
   let minutes = Math.floor(timer / 60);
   minutes = minutes < 10 ? `0${minutes}` : minutes;

   let seconds = timer % 60
   seconds = seconds < 10 ? `0${seconds}` : seconds;

   $(".timer").text(`${minutes}:${seconds}`);
 }

 function getGameTime() {
    let time = $(".timer").text();
    return time;
 }

$(".restart, .playAgain").click(start);
start();
