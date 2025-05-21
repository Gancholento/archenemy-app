// Variables Globales
let currentDeck = [];
let waitingPile = [];
let currentCard = null;
let allSchemes = [];

// Cargar cartas al iniciar
fetch('https://api.scryfall.com/cards/search?q=type:scheme')
    .then(response => response.json())
    .then(data => {
        allSchemes = data.data;
    })
    .catch(error => {
        alert('Error cargando cartas: ' + error);
    });

// Crear mazo aleatorio
function randomDeck() {
    currentDeck = [];
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * allSchemes.length);
        currentDeck.push(allSchemes[randomIndex]);
    }
    alert('¡Mazo listo con 10 cartas!');
}

// Robar carta
function drawCard() {
    const cardElement = document.getElementById('card');
    
    if (currentDeck.length === 0) {
        currentDeck = [...waitingPile];
        waitingPile = [];
        alert('¡Mazo reciclado!');
    }
    
    cardElement.classList.add('flipped');
    
    setTimeout(() => {
        if (currentCard) waitingPile.push(currentCard);
        
        const randomIndex = Math.floor(Math.random() * currentDeck.length);
        currentCard = currentDeck.splice(randomIndex, 1)[0];
        
        cardElement.style.backgroundImage = `url(${currentCard.image_uris.normal})`;
        cardElement.classList.remove('flipped');
    }, 600);
}

// Mezclar mazo
function shuffleDeck() {
    const combinedDeck = [...currentDeck, ...waitingPile];
    for (let i = combinedDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinedDeck[i], combinedDeck[j]] = [combinedDeck[j], combinedDeck[i]];
    }
    currentDeck = combinedDeck;
    waitingPile = [];
    alert('¡Mazo mezclado!');
}