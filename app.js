const express = require('express')
const config = require('config')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use('/auth', require('./routes/auth-routes'))
app.use('/auth/check', require('./routes/authChecker'))
app.use('/api/orders', require('./routes/order-routes'))
app.use('/api/products', require('./routes/product-routes'))
app.use('/api/categories', require('./routes/category-routes'))
app.use('/api/users', require('./routes/users-routes'))
app.use('/api/workers', require('./routes/workers-routes'))

const PORT = config.get('port') || 5000


app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))