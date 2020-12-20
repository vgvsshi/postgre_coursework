const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const { pool, reconnect } = require('../db')
const authToken = require('../routes/authChecker')

router.get('/', authToken, async (req, res) => {
	
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

router.post('/', async (req, res) => {
	const { token, products, sum } = req.body
	const timestamp = new Date().toISOString()

	jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
		if (err) return res.status(400).json({message: 'Невалидный токен'})
	
		const candidate = await pool.query('SELECT id FROM "user" WHERE phone = $1', [decoded.phone])
		if (candidate.rows.length === 0 || candidate.rows.length > 1) return res.status(400).json({message: 'Пользователь не найден'})
		
		let client = candidate.rows[0].id

		const newOrder = await pool.query('INSERT INTO "order" (products, sum, client, timestamp) values ($1, $2, $3, $4) RETURNING *', [JSON.stringify(products), sum, client, timestamp])
		console.log('testtesttest');

		res.status(200).json({message: 'Заказ оформлен' })

	})

})

module.exports = router