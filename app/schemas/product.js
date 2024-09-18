import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    thumbnail: String,
    stock: Number
})

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Product = model('Product', productSchema)