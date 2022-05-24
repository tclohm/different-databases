import pg from 'pg';

/*
	100 partitions
	attach them to the main table customers

	docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
*/

async function run() {
	try {
		const client = pg.Client({
			"user": "postgres",
			"password": "postgres",
			"host": "localhost",
			"port": 5432,
			"database": "postgres",
		});

		console.log("Connecting to postgres...");
		await client.connect();
		//console.log("dropping database customers...");
		//await client.query("drop database customers");
		console.log("create database customers...");
		await client.query("create database customers");

		const customerClientDB = pg.Client({
			"user": "postgres",
			"password": "postgres",
			"host": "localhost",
			"port": 5432,
			"database": "customers",
		});

		console.log("Connecting to customers db...");
		await customerClientDB.connect();
		console.log("Create customer table...");
		const sql = `create table customers (id serial, name text) 
					partition by range (id)`;
		await customerClientDB.query(sql);
		console.log("creating partitions...");
		/*
		we are going to support 1B customers
		and each partition will have 10M customers
		that gives 1000/10 -> 100 partition tables
		*/
		for (let i = 0 ; i < 100; i++) {
			const idFrom = i * 1000000;
			const idTo = (i + 1) * 1000000;
			const partitionName = `customers_${idFrom}_${idTo}`;

			const psql1 = `create table ${partitionName}
							(like customers including indexes)`;
			const psql2 = `alter table customers
							attach partition ${partitionName} 
							for values from (${idFrom}) to (${idTo})`;

			console.log(`creating partition ${partitionName}`);
			await customerClientDB.query(psql1);
			await customerClientDB.query(psql2);
		}

		console.log("closing connection")
		await customerClientDB.end();
		await client.end();
		console.log("done.");
	}
}