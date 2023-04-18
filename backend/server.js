const express = require("express");
const cors = require("cors");
const { addData, createSocket, subscribe } = require("./addData");
const { Server } = require('socket.io')
const { createServer } = require('http')

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.post('/insertData', addData)

subscribe()
const server = createServer(app)
createSocket(server)


server.listen(5000, () => {
    console.log('Server runs on port 5000...');
})
