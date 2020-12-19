const { Router } = require('express')
const router = Router()
const db = require('../db')


router.get('/', async (req, res) => {
	const companies = await db.query('SELECT * FROM company')
	res.json(companies.rows)
})

router.post('/', async (req, res) => {
	const { name, phone, email } = req.body

	console.log(req.body);

	const newCompany = await db.query('INSERT INTO company (name, phone, email) values ($1, $2, $3) RETURNING *', [name, phone, email])

	res.json(newCompany.rows[0])
})

module.exports = router