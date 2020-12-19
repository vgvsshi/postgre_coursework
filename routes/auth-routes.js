const { Router } = require('express')
const router = Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.post(
	'/register',
	async (req, res) => {
		const { name, surname, phone, mail, password, company } = req.body

		const candidate = await db.query(`SELECT phone FROM "user" WHERE phone = '${phone}'`)

    if (candidate.rows.length !== 0) {
      res.status(400).json({ message: 'Пользователь уже существует' })
      return
    }

		const hashedPassword = await bcrypt.hash(password, 12)
		const variables = [name, surname, phone, mail, hashedPassword]

		if (company) {
			variables.push(company)
		}

		const querystring = 
		`INSERT INTO "user" (name, surname, phone, mail, password${company ? ', company' : ''}) values ($1, $2, $3, $4, $5${company ? ', $6' : ''}) RETURNING *`

		const newClient = await db.query(querystring, variables).catch(e => console.log(e))
		
		console.log(newClient.rows[0]);

		res.json({message: 'Вы зарегестрированы!'})
	})

router.post(
	'/login',
	async (req, res) => {
		try {

			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при входе в систему'
				})
			}

			const { email, password } = req.body

			const admin = await Admin.findOne({ email })

			if (!admin) {
				return res.status(400).json({ message: 'Неверный логин или пароль' })
			}

			const isMatch = await bcrypt.compare(password, admin.password)

			if (!isMatch) {
				return res.status(400).json({ message: 'Неверный логин или пароль' })
			}

			const token = jwt.sign(
				{ adminId: admin._id },
				config.get('jwtSecret'),
				{ expiresIn: '1h' }
			)

			res.json({ token, adminId: admin._id })

		} catch (error) {
			console.log(error.message)
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова!' })
		}

	})

module.exports = router