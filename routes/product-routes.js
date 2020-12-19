const { Router } = require('express')
const router = Router()
const db = require('../db')

router.get('/', async (req, res) => {
	const products = await db.query('SELECT * from PopulatedProducts')
	res.json(products.rows)
})

module.exports = router