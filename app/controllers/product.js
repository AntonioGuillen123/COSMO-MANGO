import { ProductModel } from '../models/product.js'

export class ProductController {
    getAll = async (req, res) => {
        let products = await ProductModel.getAll()

        res.render('product/index.ejs', {
            products: products,
            titleweb: 'COSMO-MANGO'
        })
    }
}