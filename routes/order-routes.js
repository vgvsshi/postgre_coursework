const { Router } = require('express')
const router = Router()
const { pool, reconnect } = require('../db')

router.get('/', async (req, res) => {
	
	// const candidate = await pool.query(`SELECT type FROM "user" WHERE password = '${req.user.password}'`)

	// if (candidate.rows.length == 0) {
	// 	res.status(400).json({ message: 'Не найдено' })
	// 	return
	// } else if(candidate.rows[0].type != 'admin'){
	// 	res.status(400).json({ message: 'Не админ' })
	// 	return
	// }

	const orders = await pool.query('SELECT * FROM orders')
	res.json(orders.rows)
})

router.post('/create-order', async (req, res) => {
	const { products, sum, client } = req.body
	const timestamp = new Date().toISOString()


	const newOrder = await pool.query('INSERT INTO orders (order, sum, client, timestamp) values ($1, $2, $3, $4) RETURNING *', [products, sum, client, timestamp])

	res.json(newOrder)
})

module.exports = router