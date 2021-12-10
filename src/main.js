import express from 'express'

import moviesRouter from "./services/movies/index.js"

import fs from 'fs'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'


const server = express()

server.use(express.json())

server.use('/movies', moviesRouter)

const port = process.env.PORT



server.listen(port, ()=> {
    console.log(`The server is running on Port ${port}`);
})