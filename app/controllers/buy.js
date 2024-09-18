import { DiscountModel } from '../models/discount.js'
import dotenv from 'dotenv'

dotenv.config({ path: '../env/.env'})

export class BuyController {
    buy = async (req, res) => {
        const { discountName } = req.query
        let isDiscount = false
        let discountData

        if (typeof discountName !== 'undefined') {
            isDiscount = true

            let discounts = []

            const discountsData = await DiscountModel.getByName({ discountName })

            discountsData.forEach((item) => {
                const { name, value } = item

                discounts.push({
                    name: name,
                    value: value
                })
            })

            discountData = discounts
        }

        res.render('buy/index.ejs', {
            discount: isDiscount,
            discounts: discountData
        })
    }

    checkWinner = async (req, res) => {
        const env = process.env

        const { discountName } = req.body

        const isWinner = discountName === env.DISCOUNT_FOR_FLAG

        let message = isWinner
            ? `FELICIDADEEEEES, ERES UN GRAN HAKER, AQUÍ TIENES LA FLAG: <b>${env.FLAG}</b>`
            : 'SU COMPRA SE HA REALIZADO CORRECTAMENTE, YA LE LLEGARÁ...'

        let type = isWinner
            ? 'alert-warning'
            : 'alert-success'

        let time = isWinner
            ? 10000
            : 1500

        res.json({
            alertMessage: message,
            alertType: type,
            alertTime: time
        })
    }
}