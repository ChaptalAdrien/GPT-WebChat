// Crée un WebSocket pour se connecter au serveur
const socket = new WebSocket('ws://localhost:8080');

// Récupère les éléments du DOM
const messages = document.getElementById('messages');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Fonction qui ajoute un message dans le chat
function addMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messages.appendChild(messageElement);
}

// Envoie un message au serveur lorsque le bouton est cliqué
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = '';
});

// Affiche les messages reçus du serveur
socket.addEventListener('message', event => {
  const message = event.data;
  addMessage(message);
});