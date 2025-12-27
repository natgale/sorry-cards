// Global variables
const startDeck = [
  '1 Start',
  '1 Start',
  '1 Start',
  '1 Start',
  '1 Start',
  '2 Start, roll again',
  '2 Start, roll again',
  '2 Start, roll again',
  '2 Start, roll again',
  '3 Forward',
  '3 Forward',
  '3 Forward',
  '3 Forward',
  '4 Back',
  '4 Back',
  '4 Back',
  '4 Back',
  '5 Forward',
  '5 Forward',
  '5 Forward',
  '5 Forward',
  '7 Split',
  '7 Split',
  '7 Split',
  '7 Split',
  '8 Forward',
  '8 Forward',
  '8 Forward',
  '8 Forward',
  '10 Forward or 1 back',
  '10 Forward or 1 back',
  '10 Forward or 1 back',
  '10 Forward or 1 back',
  '11 Forward or change places',
  '11 Forward or change places',
  '11 Forward or change places',
  '11 Forward or change places',
  '12 Forward',
  '12 Forward',
  '12 Forward',
  '12 Forward',
  '! Sorry!',
  '! Sorry!',
  '! Sorry!',
  '! Sorry!',
  ]

const card = document.getElementById('card')
let currentInner = 'card-a'
let colourOrder = ['red','blue','yellow','green']
const colourActive = document.getElementById('colour')

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array
}

// Create the main card deck
let deck = shuffle(startDeck).slice()

card.onclick = function(){
  if ( currentInner === 'card-a' ){
    card.style.transform = 'rotateY(180deg)'
    currentInner = 'card-b'
  } else {
    card.style.transform = 'rotateY(0deg)'
    currentInner = 'card-a'
  }
  setNextCard()
  nextColour()
}

function setNextCard(){
  
  // Get the next card (front or back)
  const nextCard = card.querySelector( '.' + currentInner )

  // Add another shuffled pack when required
  if ( deck.length === 0 ){
    deck = shuffle(startDeck).slice()
  }
  
  // Get the next value from the list and update the card
  const cardValue = deck.shift()
  const values = cardValue.split(' ');
  nextCard.querySelector('h2').innerText = values.shift()
  nextCard.querySelector('p').innerText = values.join(' ')
  
  // Remove the old player colour
  if ( colourActive.classList.contains( colourActive.className ) ){
    colourActive.classList.remove( colourActive.className )
  }
  
  // Add the new player colour
  colourActive.classList.add( colourOrder[0] )  
}

function nextColour(){
  const first = colourOrder.shift();  
  colourOrder.push(first);
}

function pickStartColour(choice){
  
  console.log('colour choice', choice)
  
  // Loop around the colours until the correct starting one
  if (choice !== colourOrder[0]){
    while ( choice !== colourOrder[0] ){
      nextColour()
    }
  }
  
  // Hide the start screen
  document.getElementById('start-screen').style.display = 'none'
  
  // Show the cards
  document.getElementById('cards').style.opacity = '100'
  document.getElementById('cards').style.marginTop = '0'
}

function reset(){
  
  // Show the start screen
  document.getElementById('start-screen').style.display = 'block'

  // Hide the cards
  document.getElementById('cards').style.opacity = '0'
  document.getElementById('cards').style.marginTop = '500px'

  // Empty the deck
  deck = [];
  
  // Switch the header player colour
  colourActive.classList.remove( colourActive.className )
  
  // Get the next card (front or back)
  const nextCard = card.querySelector( '.' + currentInner )

  // Set the active card to the start status
  nextCard.querySelector('h2').innerText = ''
  nextCard.querySelector('p').innerText = 'Start'
}

// Get the colour picker buttons and attach the click event
const colourButtons = document.querySelectorAll('.start-colour button')
for (var i = 0; i < 4; i ++ ){
  colourButtons[i].addEventListener('click', function(){
    pickStartColour(this.className);
  })
}

// Attach the reset script
document.getElementById('reset').addEventListener('click', function(){
  reset()
})