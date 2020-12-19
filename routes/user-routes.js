const { Router } = require('express')
const router = Router()
const db = require('../db')

router.get('/', async (req, res) => {
	const clients = await db.query('SELECT * FROM client')
	console.log(clients.rows);
	res.json(clients.rows)
})

router.post('/', async (req, res) => {
})

module.exports = router