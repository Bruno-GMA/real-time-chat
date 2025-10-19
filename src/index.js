const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {
  console.log('a user connected');

  // Envia mensagens antigas
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
  });
  messages.forEach((msg) => socket.emit('chat message', msg.content));

  // Recebe novas mensagens
  socket.on('chat message', async (msg) => {
    await prisma.message.create({ data: { content: msg } });
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
