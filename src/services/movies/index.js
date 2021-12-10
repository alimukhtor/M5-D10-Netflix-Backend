import express from 'express'
import uniqid from 'uniqid'
import {getMovies, writeMovies} from "../../library/fs-tools.js"

const moviesRouter = express.Router()
moviesRouter.post("/", async(request, response, next)=> {
    try {
        console.log("Body:",request.body);
        const newMovie = {
            ...request.body,    
            createdAt: new Date(),
            id: uniqid()
        }
        const movies = await getMovies()
        movies.push(newMovie)
        await writeMovies(movies)
        response.status(201).send({id: newMovie.id})
    } catch (error) {
        next(error)
    }
})


export default moviesRouter