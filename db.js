const Pool = require('pg').Pool
const pool = new Pool({
	user: "postgres",
	password: '787898Amir',
	host: 'localhost',
	port: 5432,
	database: "gagauz"
})


module.exports = pool