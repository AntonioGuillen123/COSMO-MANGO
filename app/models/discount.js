import { Discount } from '../schemas/discount.js'

export class DiscountModel {
    static getByName = async ({ discountName }) => await Discount.find({ name: discountName })
}