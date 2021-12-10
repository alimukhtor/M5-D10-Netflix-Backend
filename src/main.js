import express from 'express'

import mediaRouter from "./services/media/index.js"
import reviewsRouter from "./services/reviews/index.js"




const server = express()

server.use(express.json())

const port = process.env.PORT

server.use('/media', mediaRouter)
server.use('/reviews', reviewsRouter)




server.listen(port, ()=> {
    console.log(`The server is running on Port ${port}`);
})