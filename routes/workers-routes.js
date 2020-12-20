const { Router } = require('express')
const router = Router()
const { pool, reconnect } = require('../db')

router.get('/', async (req, res) => {
	const workers = await pool.query('SELECT * from worker')
	res.json(workers.rows)
})

router.post('/', async (req, res) => {
	const { name, surname, salary, profession } = req.body
	await pool
				.query('INSERT INTO worker (name, surname, salary, profession) values ($1, $2, $3, $4) RETURNING *', [ name, surname, salary, profession ])
				.catch(err => res.json({error: err}))

	res.sendStatus(200)
})

router.post('/delete', async (req, res) => {
	const { id } = req.body

	await pool
				.query(`DELETE FROM worker WHERE worker.id = '${id}'`)
				.catch(err => res.json({error: err}))

	res.sendStatus(200)
})

module.exports = router