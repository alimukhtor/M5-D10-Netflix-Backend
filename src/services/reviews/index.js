import express from 'express'
import uniqid from 'uniqid'
import createHttpError from "http-errors"
import {getReviews, writeReviews, getMedia, writeMedia} from "../../library/fs-tools.js"
import {reviewValidation} from "../../middleWares/validation.js"
import { validationResult } from 'express-validator'

const reviewsRouter = express.Router()


reviewsRouter.post("/:mediaId", reviewValidation, async(request, response, next)=> {
    try {
        console.log("Media Id", request.body);
        const errors = validationResult(request)
        if (!errors.isEmpty()) return next(createHttpError(400, "All the fields should be filled!", { errors }))
        const media = await getMedia()
        // const reviews = await getReviews()
        const newReview = { ...request.body,
            id: uniqid(),
            createdAt: new Date(),
            updatedAt: new Date()
            }
            media.push(newReview)
        await writeMedia(media)
        response.status(201).send({id:newReview.id})
    } catch (error) {
        next(error)
    }
})

reviewsRouter.delete("/:reviewId", async(request, response, next)=> {
    try {
        const reviews = await getReviews()
        console.log("review ID :", request.reviewId);
        const remainingReview = reviews.filter(review => review.id !== request.params.reviewId)
        await writeReviews(remainingReview)
        response.status(204).send()
    } catch (error) {
        next(error)
    }
})


export default reviewsRouter