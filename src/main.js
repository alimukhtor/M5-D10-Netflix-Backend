import express from 'express'

const server = express()
server.use(express.json())

const port = process.env.PORT


server.listen(port, ()=> {
    console.log(`The server is running on Port, ${port}`);
})