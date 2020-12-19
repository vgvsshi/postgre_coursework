const { Router } = require('express')
const router = Router()
const db = require('../db')

router.get('/', async (req, res) => {
	const products = await db.query('SELECT product.id AS id, product.name AS product_title, category.name AS category_title, product.price AS price, product.amount AS amount FROM product INNER JOIN category ON product.category_id = category.id')
	res.json(products.rows)
})

module.exports = router