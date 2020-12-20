const { Router } = require('express')
const router = Router()
const { pool, reconnect } = require('../db')
const authToken = require('./authMiddleware')

router.get('/', authToken, async (req, res) => {
	const db = reconnect(req.payload.type)
	const categories = await db.query('SELECT * FROM category')
	res.json(categories.rows)
})

router.post('/', authToken, async (req, res) => {
	const { title } = req.body
	const db = reconnect(req.payload.type)
	
	const candidate = await db.query(`SELECT category.name FROM category WHERE category.name = '${title}'`)

	if (candidate.rows.length !== 0) {
		res.status(400).json({ message: 'Категория с таким названием уже существует' })
		return
	}

	const newCategory = await db.query('INSERT INTO category (name) values ($1) RETURNING *', [title])
	res.json(newCategory.rows[0])

})

module.exports = router