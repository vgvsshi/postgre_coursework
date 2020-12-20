const { Router } = require('express')
const router = Router()
const { pool, reconnect } = require('../db')
const authToken = require('./authMiddleware')

router.get('/', async (req, res) => {
	const products = await pool.query('SELECT * from PopulatedProducts')
	res.json(products.rows)
})

router.get('/:id', authToken, async (req, res) => {
	const { id } = req.params
	const candidate = await pool.query(`SELECT * FROM product WHERE id = $1`, [id]).catch(e => res.json(e))
	res.json(candidate)

})

router.post('/', authToken, async (req, res) => {
	const { name, price, category_id, quantity } = req.body
	const db = reconnect(req.payload.type)

	const candidate = await db.query(`SELECT name FROM product WHERE name = '${name}'`)

	if (candidate.rows.length !== 0) {
		res.status(400).json({ message: 'Товар с таким названием уже существует' })
		return
	}

	await db.query('INSERT INTO product (name, price, category_id, quantity) values ($1, $2, $3, $4) RETURNING *', [name, price, category_id, quantity]).catch(e => res.json(e))
	res.status(200).json({message: 'Продукт добавлен!'})
})

router.patch('/:id', authToken, async (req, res) => {
	const { id, name, price, category_id, quantity } = req.body
	const db = reconnect(req.payload.type)
	try{
		await db.query('UPDATE product SET name = $1, price = $2, category_id = $3, quantity = $4 WHERE id = $5 RETURNING *', [name, price, category_id, quantity, id])
		res.status(200).json({message: 'Продукт изменён!'})
	} catch(e){
		console.log('PRODUCT_ROUTES', e);
	}

})

router.post('/delete', authToken, async (req, res) => {
	const { id } = req.body
	const db = reconnect(req.payload.type)
	await db.query(`DELETE FROM product WHERE product.id = '${id}'`)

	res.status(200).json({message: 'Продукт удалён!'})
})

module.exports = router