import express from 'express'
import uniqid from 'uniqid'
import {getReviews, writeReviews} from "../../library/fs-tools.js"

const reviewsRouter = express.Router()


reviewsRouter.post("/", async(request, response, next)=> {
    try {
        const reviews = await getReviews()
        const newReview = { ...request.body,
            id: uniqid(),
            createdAt: new Date(),
            updatedAt: new Date()
            }
        reviews.push(newReview)
        await writeReviews(reviews)
        response.status(201).send({id:newReview.id})
    } catch (error) {
        next(error)
    }
})


export default reviewsRouter