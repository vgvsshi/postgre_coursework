const { Router } = require('express')
const router = Router()
const { reconnect } = require('../db')
const authToken = require('./authMiddleware')

router.get('/', authToken, async (req, res) => {
	const db = reconnect(req.payload.type)
	const users = await db.query('SELECT * FROM "user"').catch(err => res.json({error: err}))
	res.json(users.rows)
})

router.get('/:id', authToken, async (req, res) => {
	const db = reconnect(req.payload.type)
	const user = await db.query(`SELECT * FROM "user" WHERE id = ${req.params.id} LIMIT 1`).catch(err => res.json({error: err}))
	res.json(user.rows)
})

router.patch('/:id', authToken, async (req, res) => {
	const db = reconnect(req.payload.type)
	await db.query(`UPDATE "user" SET type = $1 WHERE id = ${req.params.id}`, [req.body.type]).catch(err => res.json({error: err}))
	res.status(200).json({message: 'Пользователь изменён!'})
})

router.delete('/:id', authToken, async (req, res) => {
	const db = reconnect(req.payload.type)
	await db.query(`DELETE FROM "user" WHERE id = ${req.params.id} LIMIT 1`).catch(err => res.json({error: err}))
	res.status(200).json({message: 'Пользователь удалён!'})
})

router.post('/', authToken, async (req, res) => {
	const { name, surname, salary, profession } = req.body
	const db = reconnect(req.payload.type)
	await db
				.query('INSERT INTO "user" (name, surname, salary, profession) values ($1, $2, $3, $4) RETURNING *', [ name, surname, salary, profession ])
				.catch(err => res.json({error: err}))

	res.status(200).json({message: 'Пользователь удалён!'})
})

module.exports = router