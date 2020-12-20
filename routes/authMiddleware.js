const jwt = require('jsonwebtoken')
const { reconnect } = require('../db')

function authToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if(token == null) return res.status(400).json({message: 'Токен пуст'})

	jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
		if (err) return res.status(400).json({message: 'Невалидный токен'})
	
		const db = reconnect('admin')
		const candidate = await db.query('SELECT type FROM "user" WHERE phone = $1', [decoded.phone])
		if (candidate.rows.length === 0 || candidate.rows.length > 1) return res.status(400).json({message: 'Пользователь не найден'})

		if (candidate.rows[0].type !== decoded.type){
			decoded.type = candidate.rows[0].type
			req.payload = decoded
		} else{
			req.payload = decoded
		}

		next()
	})
}

module.exports = authToken