const { Router } = require('express')
const router = Router()
const { pool } = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post(
	'/register',
	async (req, res) => {
		const { name, surname, phone, mail, password, company } = req.body

		const candidate = await pool.query(`SELECT phone FROM "user" WHERE phone = '${phone}'`)

    if (candidate.rows.length !== 0) {
      res.status(400).json({ message: 'Пользователь уже существует' })
      return
    }

		const hashedPassword = await bcrypt.hash(password, 12)
		const variables = [ name, surname, phone, mail, hashedPassword ]

		if (company) {
			variables.push(company)
		}

		const querystring = 
		`INSERT INTO "user" (name, surname, phone, mail, password${company ? ', company' : ''}) values ($1, $2, $3, $4, $5${company ? ', $6' : ''}) RETURNING *`

		const newClient = await pool.query(querystring, variables).catch(e => console.log('AUTH_ROUTES', e))

		const token = jwt.sign(
			{ type: newClient.rows[0].type, phone: newClient.rows[0].phone },
			process.env.ACCESS_TOKEN,
			{ expiresIn: '1h' }
		)

		res.json({ token })
	})

router.post(
	'/login',
	async (req, res) => {
		try {

			const { phone, password } = req.body

			const candidate = await pool.query(`SELECT password, type, phone FROM "user" WHERE phone = '${phone}'`)

			if (candidate.rows.length == 0) {
				res.status(400).json({ message: 'Пользователь не существует' })
				return
			}
			const isMatch = await bcrypt.compare(password, candidate.rows[0].password)

			if (!candidate.rows[0] || !isMatch) {
				return res.status(400).json({ message: 'Неверный логин или пароль' })
			}

			const token = jwt.sign(
				{ type: candidate.rows[0].type, phone: candidate.rows[0].phone },
				process.env.ACCESS_TOKEN,
				{ expiresIn: '1h' }
			)

			res.json({ token })

		} catch (error) {
			console.log('AUTH_ROUTES 2',error.message)
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
		}

	})

module.exports = router