import express, { request } from 'express'
import uniqid from 'uniqid'
import {getMedia, writeMedia, getReviews, writeReviews} from "../../library/fs-tools.js"

const mediaRouter = express.Router()
mediaRouter.post("/", async(request, response, next)=> {
    try {
        console.log("Body:", request.body);
        const newMedia = {
            ...request.body, 
            id: uniqid()   
        }
        const media = await getMedia()
        media.push(newMedia)
        await writeMedia(media)
        response.status(201).send({id: newMedia.id})
    } catch (error) {
        next(error)
    }
})

mediaRouter.get("/", async(request, response, next)=> {
    try {
        const media = await getMedia()
        response.status(200).send(media)
    } catch (error) {
        next(error)
    }
})
mediaRouter.get("/:mediaId", async(request, response, next)=> {
    try {
        const media = await getMedia()
        console.log("media id:", request.params.mediaId);

        const getById = media.find(movie => movie.id === request.params.mediaId)
        response.send(getById)
    } catch (error) {
        next(error)
    }
})
mediaRouter.get('/:mediaId/reviews', async(req, res, next) => {
    try {
        const reviews = await getReviews()
        const mediaReviews = reviews.filter(review => review.productId === req.params.productId)
        if (mediaReviews.length === 0) return res.send('No Reviews For This Media')
        res.send(mediaReviews)
    } catch (error) {
        next(error)
    }
})

mediaRouter.put("/:mediaId", async(request, response, next)=> {
    try {
        const media = await getMedia()
        const findIndex = media.findIndex(index => index.id === request.params.mediaId)
        const updatingMedia = media[findIndex]
        const updateFields = request.body
        const updatedMedia =  { ...updatingMedia, ...updateFields, updatedAt: new Date}
        media[findIndex] = updatedMedia
        await writeMedia(media)
        response.send(updatedMedia)
    } catch (error) {
        next()
    }
})

mediaRouter.delete("/:mediaId", async(request, response, next)=> {
    try {
        const media = await getMedia()   
        const deleteById = media.filter(detail => detail.id !== request.params.mediaId)
        await writeMedia(deleteById)
        response.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default mediaRouter