const { Router } = require('express')
const router = Router()
const { reconnect } = require('../db')

router.get('/', async (req, res) => {
	const categories = await db.query('SELECT * FROM category')
	res.json(categories.rows)
})

router.post('/', async (req, res) => {
	const { name } = req.body
	const newCategory = await db.query('INSERT INTO category (name) values ($1) RETURNING *', [name])
	res.json(newCategory.rows[0])
})

module.exports = router