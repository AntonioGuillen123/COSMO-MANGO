import { Router } from 'express'
import { BuyController } from '../controllers/buy.js'

export const createBuyRouter = () => {
    const buyRouter = Router()

    const buyController = new BuyController()

    buyRouter.get('/', buyController.buy)

    buyRouter.post('/checkWinner', buyController.checkWinner)

    return buyRouter
}