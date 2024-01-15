import { createServer } from "http";
import app from "./app.js";
import path from "path"
import { Server } from "socket.io";

const server = createServer(app)

server.listen(3000, () => {
  console.log('Server running!')
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`)

  // server emits notification event to the client
  socket.emit('notification', 'Thanks for connecting to Kuldeep!')

  // send mesage as mesage event
  socket.send("Hello, How are you?")

  // server recieve message event from the client
  socket.on('message', (data) => {
    console.log(`New message from ${socket.id}: ${data}`);
  })
  
  // when someone disconent
  socket.on('disconnect', (socket)=> {
    console.log(`Disconnected: ${socket.id}`);
  });
})