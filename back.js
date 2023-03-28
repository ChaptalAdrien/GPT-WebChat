// Importe les modules nécessaires
const WebSocket = require('ws');
const http = require('http');
const express = require('express');

// Crée une application express
const app = express();

// Crée un serveur HTTP avec l'application express
const server = http.createServer(app);

app.use(express.static(''));

// Crée un serveur WebSocket sur le même port que le serveur HTTP
const wss = new WebSocket.Server({ server });

// Stocke les connexions WebSocket actives
const connections = new Set();

// Écoute les connexions WebSocket
wss.on('connection', socket => {
  // Ajoute la connexion à l'ensemble des connexions actives
  connections.add(socket);

  // Écoute les messages envoyés par la connexion
  socket.on('message', message => {
    // Envoie le message à toutes les connexions actives
    connections.forEach(connection => {
      if (connection !== socket) {
        connection.send(message);
      }
    });
  });

  // Écoute la fermeture de la connexion
  socket.on('close', () => {
    // Retire la connexion de l'ensemble des connexions actives
    connections.delete(socket);
  });
});

// Démarre le serveur HTTP
server.listen(8080, () => {
  console.log('Serveur démarré sur le port 8080.');
});
