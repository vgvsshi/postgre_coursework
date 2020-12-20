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

const reconnect = (type) => {
	switch (type) {
		case 'admin':
			return new Pool({
				user: 'postgres',
				password: 'SheeshGirl1936',
				host: 'localhost',
				port: 5432,
				database: 'postgres'
			})

		case 'manager':
			return new Pool({
				user: 'manager',
				password: '111',
				host: 'localhost',
				port: 5432,
				database: 'postgres'
			})

		case 'client':
			return new Pool({
				user: 'testrole',
				password: '111',
				host: 'localhost',
				port: 5432,
				database: 'postgres'
			})
	}
}

module.exports.reconnect = reconnect
module.exports.pool = pool