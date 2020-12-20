const { Router } = require('express')
const router = Router()
const { pool, reconnect } = require('../db')

router.get('/', async (req, res) => {
	const products = await pool.query('SELECT * from PopulatedProducts')
	res.json(products.rows)
})

router.post('/', async (req, res) => {
	const { title, price, category, quantity } = req.body

	const candidate = await pool.query(`SELECT product.name FROM product WHERE product.name = '${title}'`)

	if (candidate.rows.length !== 0) {
		res.status(400).json({ message: 'Товар с таким названием уже существует' })
		return
	}

	const category_id = await pool.query(`SELECT category.id FROM category WHERE category.name = '${category}'`)

	const newProd = await pool.query('INSERT INTO product (name, price, category_id, quantity) values ($1, $2, $3, $4) RETURNING *', [title, price, category_id.rows[0].id, quantity])
	res.json(newProd.rows)
})

router.post('/delete', async (req, res) => {
	const { id } = req.body

	await pool.query(`DELETE FROM product WHERE product.id = '${id}'`)

	res.json('Продукт удален')
})

module.exports = router