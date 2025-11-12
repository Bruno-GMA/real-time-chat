const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const { encrypt, decrypt } = require('./crypto');

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {
  console.log('a user connected');

  // Envia mensagens antigas guardadas no banco de dados (descriptografadas)
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'asc' },
  });
  messages.forEach((msg) => {
    const decryptedContent = decrypt(msg.content);
    socket.emit('chat message', decryptedContent);
  });

  // Recebe novas mensagens
  socket.on('chat message', async (msg) => {
    const encryptedMsg = encrypt(msg);
    await prisma.message.create({ data: { content: encryptedMsg } });
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});