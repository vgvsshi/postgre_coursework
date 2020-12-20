const { Router } = require('express')
const router = Router()
const { pool, reconnect } = require('../db')
const authToken = require('./authMiddleware')

router.get('/', authToken, async (req, res) => {
	const workers = await pool.query('SELECT * from worker')
	res.json(workers.rows)
})

router.get('/:id', authToken, async (req, res) => {
	const { id } = req.params
	const candidate = await pool.query(`SELECT * FROM worker WHERE id = $1`, [id]).catch(e => res.json(e))
	res.json(candidate)

})

router.patch('/:id', authToken, async (req, res) => {
	const { id, name, surname, salary, profession } = req.body
	const db = reconnect(req.payload.type)
	try{
		await db.query('UPDATE worker SET name = $1, surname = $2, salary = $3, profession = $4 WHERE id = $5 RETURNING *', [ name, surname, salary, profession, id])
		res.status(200).json({message: 'Рабочий изменена!'})
	} catch(e){
		console.log('PRODUCT_ROUTES', e);
	}

})

router.post('/', authToken, async (req, res) => {
	let { name, surname, salary, profession } = req.body
	salary = parseInt(salary)
	await pool
				.query('INSERT INTO worker (name, surname, salary, profession) values ($1, $2, $3, $4) RETURNING *', [ name, surname, salary, profession ])
				.catch(err => res.status(400).json(err))

	res.status(200).json({message: 'Рабочий добавлен' })
})

router.post('/delete', authToken, async (req, res) => {
	const { id } = req.body

	await pool
				.query(`DELETE FROM worker WHERE worker.id = '${id}'`)
				.catch(err => res.json({error: err}))

	res.status(200).json({message: 'Рабочий удалён' })
})

module.exports = router