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

//connection of database
import connectMongo from './database/db.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'

import Pusher from 'pusher'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'

/* CONFIGURATION */



//fileURLToPath - decodes the file URL to a path string
//import.meta - The import.meta meta-property exposes context-specific metadata to a JavaScript module. It contains information about the module, such as the module's URL.
const __filename = fileURLToPath(import.meta.url)//used to grab filr url

//  D:/testing FUllstack project\5-social media\backend>
const __dirname = path.dirname(__filename)


dotenv.config()
const app = express()

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.Cloud_api_key,
  api_secret: process.env.api_secret
});


export const pusher = new Pusher({
  appId: process.env.pusherAppId,
  key: process.env.pusherKey,
  secret: process.env.pusherSecret,
  cluster: process.env.pusherCluster,
  useTLS: true
});


// parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())


//replaced with app.use(cors())
/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  next()
}) */


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

const corsOptions ={
  origin:/* 'https://projects-mern.vercel.app' ||  */ 'http://localhost:3000' process.env.frontendUrl , 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
//invoking cross origin resource sharing policies
app.use(cors(corsOptions))

app.use('/user', userRoutes)
app.use('/posts', postRoutes)
app.use('/message', messageRoutes)
app.use('/conversation', conversationRoutes)

/* Mongoose setup */
connectMongo()
const db = mongoose.connection

db.once('open', () => {
  //console.log('DB connected')

  const msgCollection = db.collection("messages");
  //watching the messages collection
  const changeStream = msgCollection.watch()
  //storing the "change" in a variable named change
  changeStream.on('change', (change) => {
    //console.log('change stream', change)
    if (change.operationType === 'insert') {
      const newMessage = change.fullDocument;
      //creating channel named "messages" in pusher
      //console.log(newMessage)
      pusher.trigger('messages-'+newMessage.receiver, 'insert', newMessage);

    } else {
      //console.log('Error triggering Pusher')
    }
  })

}) 
// db.once('open', () => {
//   //console.log('DB connected')

//   const msgCollection = db.collection("posts");
//   //watching the messages collection
//   const changeStream = msgCollection.watch()
//   //storing the "change" in a variable named change
//   changeStream.on('change', (change) => {
//     //console.log('change stream', change)
//     if (change.operationType === 'insert') {
//       const newPost = change.fullDocument;
//       //creating channel named "messages" in pusher
//       //console.log(newMessage)
//       pusher.trigger(`posts`, 'posted', newPost);

//     } else {
//       //console.log('Error triggering Pusher')
//     }
//   })

// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  //console.log(`Server listening on http://localhost:${PORT}`)
})


