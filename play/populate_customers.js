import pg from 'pg';

/*
	connect to db

	docker exec -it pg psql -U postgres -d customers

*/

async function populate() {
	try {

		const customerClientDB = pg.Client({
			"user": "postgres",
			"password": "postgres",
			"host": "localhost",
			"port": 5432,
			"database": "customers",
		});

		console.log("connecting to customers db...");
		await customerClientDB.connect();

		console.log("inserting customers...");

		for (let i = 0 ; i < 100 ; i++) {
			const psql = `insert into customers(name) (
				select random() from generate_series(1,1000000)
				)`;

			console.log('inserting 10m customers...');
			await customerClientDB.query(psql);
		}

		console.log("closing connection");
		await customerClientDB.end();
		console.log("Done.")
}