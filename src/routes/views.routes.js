import { Router } from "express";
import cartsDao from "../daos/dbManager/carts.dao.js";
import productsDao from "../daos/dbManager/products.dao.js";
import { __dirname, passportCall } from '../utils.js';

const router = Router();

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/products', passportCall('current'), async (req, res) => {
    if (!req.user) {
        return res.redirect('/login')
    }

    const {page, limit, sort, category, status} = req.query;
    const products = await productsDao.getAll({page, limit, sort, category, status})
    
    res.render('products', { products, user: req.user})
})

router.get('/products/:id', async (req, res) => {
    const product = await productsDao.getById(req.params.id)
    
    res.render('productDetails', { product })
})

router.get('/carts/:cid', async (req,res) => {
    const cart = await cartsDao.getCartByID(req.params.cid)

    console.log(cart)

    res.render('cart', { cart })
})

router.get('/login', async (req, res) => {    
    res.render('login')
})

router.get('/register', async (req, res) => {    
    res.render('register')
})



export default router;