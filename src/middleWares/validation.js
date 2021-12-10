import { body } from 'express-validator'


export const reviewValidation = [
    body('comment').exists().isLength({ min: 1 }).withMessage('You Must Have A Comment'),
    body('rating').exists().isLength({ max: 5 }).withMessage('You Must Have A rating'),
]


export const mediaValidation = [
    body("Title").exists().isLength({min:1}).withMessage("Title is a mandatory field!"), 
    body("Year").exists().isLength({min:1}).withMessage("Year is a mandatory field!"), 
    body("Type").exists().isLength({min:1}).withMessage("Type is a mandatory field!"),  
  ]