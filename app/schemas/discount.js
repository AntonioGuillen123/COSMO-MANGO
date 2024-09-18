import { Schema, model } from 'mongoose'

const discountSchema = new Schema({
    name: String,
    value: String
})

discountSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Discount = model('Discount', discountSchema)