import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { addUser, getUsersInRoom, removeUser } from './users';
import {
  createDeckOfRoom,
  deckAlreadyExists,
  pickFourWhiteCards,
  pickOneWhiteCard,
  pickOneBlackCard,
} from './cards';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('joinRoom', ({ name, room }) => {
    addUser(socket.id, name, room);

    socket.join(room);

    if (deckAlreadyExists(room)) return;

    createDeckOfRoom(room);
  });

  socket.on('getFourWhiteCards', (room) => {
    if (!room) return;
    const fourCards = pickFourWhiteCards(room);

    socket.emit('fourWhiteCards', fourCards);
  });

  socket.on('getUsersInRoom', (room) => {
    const users = getUsersInRoom(room);

    io.to(room).emit('usersInRoom', users);
  });

  socket.on('newWhiteCard', (room) => {
    const whiteCard = pickOneWhiteCard(room);

    socket.emit('whiteCard', whiteCard);
  });

  socket.on('newBlackCard', (room) => {
    const blackCard = pickOneBlackCard(room);

    io.to(room).emit('blackCard', blackCard);
  });

  socket.on('newWhiteCardSelected', (data) => {
    const card = data.card[0];
    io.to(data.room).emit('whiteCardSelected', card);
  });

  socket.on('setNewRound', (room) => {
    io.to(room).emit('newRound');
  });

  socket.on('disconnect', () => {
    const room = removeUser(socket.id);

    if (room) {
      const users = getUsersInRoom(room);

      io.to(room).emit('usersInRoom', users);
    }
  });
});

server.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server started on port 3333!');
});
