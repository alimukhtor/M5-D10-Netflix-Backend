import express from 'express'

import mediaRouter from "./services/media/index.js"
import reviewsRouter from "./services/reviews/index.js"
import errorHandler from './middleWares/errorHandlers.js'
import listEndpoints from 'express-list-endpoints'



const server = express()

server.use(express.json())

const port = process.env.PORT

server.use('/media', mediaRouter)
server.use('/reviews', reviewsRouter)
console.table(listEndpoints(server));


server.use(errorHandler)



server.listen(port, ()=> {
    console.log(`The server is running on Port ${port}`);
})