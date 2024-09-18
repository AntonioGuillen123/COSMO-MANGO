import { Router } from 'express'
import { ProductController } from '../controllers/product.js'

export const createProductRouter = () => {
    const productRouter = Router()

    const productController = new ProductController()

    productRouter.get('/', productController.getAll)

    return productRouter
}