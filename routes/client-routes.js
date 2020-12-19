const { Router } = require('express')
const router = Router()
const db = require('../db')

router.get('/', async (req, res) => {
	const clients = await db.query('SELECT * FROM client')
	res.json(clients.rows)
})

router.post('/', async (req, res) => {
	const { name, surname, phone, email, company } = req.body
	const variables = [name, surname, phone, email]

	if (company) {
		variables.push(company)
	}

	const newClient = await db.query(`INSERT INTO client (name, surname, phone, email${company ? ', company' : ''}) values ($1, $2, $3, $4${company ? ', $5' : ''}) RETURNING *`, variables)

	res.json(newClient.rows[0])
})

module.exports = router