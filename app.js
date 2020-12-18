const express = require('express')
const config = require('config')


const app = express()

app.use('/api/orders', require('./routes/order-routes'))
app.use('/api/products', require('./routes/product-routes'))

app.use(express.json())
const PORT = config.get('port') || 5000


app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))