const { Router } = require('express')
const router = Router()
const db = require('../db')


router.get('/', async (req, res) => {

})

router.post('/create-order', async (req, res) => {
	const { order, sum, client, timestamp } = req.body

	const newOrder = await db.query('INSERT INTO orders (order, sum, client, timestamp) values ($1, $2, $3, $4) RETURNING *', [order, sum, client, timestamp])

	res.json(newOrder)
})

module.exports = router