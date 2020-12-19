const Pool = require('pg').Pool

//	user: "postgres",
//	password: '787898Amir',
	
const pool = new Pool({
	user: 'postgres',
	password: 'SheeshGirl1936',
	host: 'localhost',
	port: 5432,
	database: 'postgres'
})

module.exports = pool