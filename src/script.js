
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
let colourOrder = []
let selectedColors = []
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

function selectColor(color) {
  const button = document.querySelector(`[data-color="${color}"]`)
  
  // If already selected, remove it and all colors after it
  const existingIndex = selectedColors.indexOf(color)
  if (existingIndex !== -1) {
    // Remove this color and all after it
    const colorsToRemove = selectedColors.slice(existingIndex)
    colorsToRemove.forEach(colorToRemove => {
      const btnToRemove = document.querySelector(`[data-color="${colorToRemove}"]`)
      btnToRemove.textContent = ''
      btnToRemove.classList.remove('selected')
    })
    selectedColors = selectedColors.slice(0, existingIndex)
  } else {
    // Add new color
    selectedColors.push(color)
    button.textContent = selectedColors.length
    button.classList.add('selected')
  }
  
  // Update start button state
  const startButton = document.getElementById('start-game')
  startButton.disabled = selectedColors.length === 0
}

function startGame() {
  if (selectedColors.length === 0) return
  
  // Set the color order based on selection
  colourOrder = [...selectedColors]
  
  // Hide the start screen
  document.getElementById('start-screen').style.display = 'none'
  
  // Show the cards
  document.getElementById('cards').style.opacity = '100'
  document.getElementById('cards').style.marginTop = '0'
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
  const shouldAdvanceColour = setNextCard()
  if (shouldAdvanceColour) {
    nextColour()
  }
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
  
  // Return false if this is a "roll again" card (same player goes again)
  return !cardValue.includes('roll again')
}

function nextColour(){
  const first = colourOrder.shift();  
  colourOrder.push(first);
}

function reset(){
  
  // Show the start screen
  document.getElementById('start-screen').style.display = 'block'

  // Hide the cards
  document.getElementById('cards').style.opacity = '0'
  document.getElementById('cards').style.marginTop = '500px'

  // Reset selections
  selectedColors = []
  colourOrder = []
  
  // Clear color button numbers and selections
  document.querySelectorAll('.start-colour button[data-color]').forEach(btn => {
    btn.textContent = ''
    btn.classList.remove('selected')
  })
  
  // Disable start button
  document.getElementById('start-game').disabled = true
  
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
const colourButtons = document.querySelectorAll('.start-colour button[data-color]')
colourButtons.forEach(button => {
  button.addEventListener('click', function(){
    selectColor(this.dataset.color)
  })
})

// Attach the start game event
document.getElementById('start-game').addEventListener('click', startGame)

// Attach the reset script
document.getElementById('reset').addEventListener('click', function(){
  reset()
})

