import { Router } from 'express'
import { createBuyRouter } from './buy.js'
import { createProductRouter } from './product.js'

export const createAppRouter = () => {
    const appRouter = Router()

    appRouter.use('/product', createProductRouter())
    appRouter.use('/buy', createBuyRouter())

    appRouter.use((req, res) => res.redirect('/product'))

    return appRouter
}