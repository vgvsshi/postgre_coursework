const { Router } = require('express')
const router = Router()
const authToken = require('./authMiddleware')

router.get('/', authToken, (req, res) => {
	res.json(req.payload)
})

module.exports = router