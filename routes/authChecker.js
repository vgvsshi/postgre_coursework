const { Router } = require('express')
const router = Router()
const authToken = require('./authMiddleware')
const { reconnect } = require('../db')

router.get('/', authToken, (req, res) => {
	res.json(req.payload)
})

module.exports = router