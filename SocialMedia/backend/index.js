import express from 'express'

//to process the request body
import bodyParser from 'body-parser'


//for cross origin request
import cors from 'cors'

import dotenv from 'dotenv'


//for requests safety
import helmet from 'helmet'

//for login
import morgan from 'morgan'

//These two will help us set the path when we configure directories 
import path from 'path'
import { fileURLToPath } from 'url'

//for fileupload
import fileUpload from 'express-fileupload'
//socket.io
import { Server } from "socket.io"
import http from "http"

//connection of database
import connectMongo from './database/db.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'

import conversations from "./routes/conversations.js"
import messages from "./routes/messages.js"

/* CONFIGURATION */

//fileURLToPath - decodes the file URL to a path string
//import.meta - The import.meta meta-property exposes context-specific metadata to a JavaScript module. It contains information about the module, such as the module's URL.
const __filename = fileURLToPath(import.meta.url)//used to grab filr url

//  D:/testing FUllstack project\5-social media\backend>
const __dirname = path.dirname(__filename)


dotenv.config()
const app = express()
// parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())




//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet())

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

//use to log some special data like url,type of request
app.use(morgan("common"))
app.use(fileUpload({
  useTempFiles: true
}))

app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }))


app.use(bodyParser.json({ limit: "40mb", extended: true }))


//invoking cross origin resource sharing policies
app.use(cors())

app.use('/user', userRoutes)
app.use('/posts', postRoutes)
app.use('/message', messageRoutes)
app.use('/conversation', conversationRoutes)
app.use('/api/conversations', conversations)
app.use('/api/messages', messages)
/* Mongoose setup */
connectMongo()


const PORT = process.env.PORT || 5000
//socket.io configuration
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })
//socketId -> value
let users = []
const addUser = (userId, socketId) => {
  !users.some(user => user.sub == userData.sub) && users.push({ userId, socketId })
}
const getUser = (userId) => {
  return users.find(user => user.userId === userId)
}
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
io.on('connection', (socket) => {
  console.log('New Connection')
  socket.on('joined', (user) => {
    //console.log(user, socket.id)
    addUser(user, socket.id)

    io.emit('getUsers', users)
  })
  socket.on('sendMessage', data => {
    const user = getUser(data.receiverId)
    console.log(user)
    io.to(user.socketId).emit('getMessage', data)
  })
  socket.on('disconnect', () => {
    console.log('user left')
    removeUser(socket.id);
    io.emit("getUsers", users);
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

//app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

