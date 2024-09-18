import { Product } from '../schemas/product.js'

export class ProductModel {
    static getAll = async () => await Product.find({})
}