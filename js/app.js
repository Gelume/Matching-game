let openedCard = "";
let matched = [];

function start() {
  /*
   * Create a list that holds all of your cards
   */
  let cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt",
               "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle"];

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
   let target = $(e.target);
   card = target.data("card");

   if (!openedCard) {
     openedCard = card;
     displayOpen(target);
   } else if (openedCard === card) {
     openedCard = "";
     matched.push(card);
     // check victory
     displayMatch(target);
   } else {
     displayOpen(target);
     openedCard = "";
     displayNotMatch();
   }
 }

 function displayOpen(target) {
   target.addClass("open");
 }

 function displayMatch(target) {

 }

 function displayNotMatch() {
   setTimeout(() => $("li.open").removeClass("open"), 300);
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
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

start();
