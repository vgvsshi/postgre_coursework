const { Router } = require('express')
const router = Router()
const db = require('../db')

router.get('/', async (req, res) => {
	const products = await db.query('SELECT product.name, product.price FROM product INNER JOIN category ON category_id = category.id;')
	console.log(products.rows)
	res.json(products.rows)
})

module.exports = router