import express from 'express'
import uniqid from 'uniqid'
import createHttpError from "http-errors"
import {getReviews, writeReviews} from "../../library/fs-tools.js"
import {reviewValidation} from "../../middleWares/validation.js"
import { validationResult } from 'express-validator'

const reviewsRouter = express.Router()


reviewsRouter.post("/", reviewValidation, async(request, response, next)=> {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) return next(createHttpError(400, "All the fields should be filled!", { errors }))
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