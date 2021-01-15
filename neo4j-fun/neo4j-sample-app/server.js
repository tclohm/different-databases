const express = require('express');
const neo4j = require('neo4j-driver');

const connectionstring = 'bolt://localhost:7687';

const driver =  neo4j.driver(connectionstring);

async function init() {
	const app = express();

	app.get('/get', async (req, res) => {
		const session = driver.session();
		const results = await session.run(`
			MATCH path = shortestPath(
				(First:Person {name: $person1})-[*]-(Second:Person {name: $person2})
			)
			UNWIND nodes(path) as node
			RETURN coalesce(node.name, node.title) AS title;
		`, {
			person1: req.query.person1,
			person2: req.query.person2
		})
		
		res.json({
			status: 'ok',
			path: results.records.map(record => record.get("title"))
		}).end();

		await session.close();
	});

	const PORT = 3000;
	app.use(express.static('./static'));
	app.listen(PORT);

	console.log('listening on http://localhost:' + PORT)

}

init()