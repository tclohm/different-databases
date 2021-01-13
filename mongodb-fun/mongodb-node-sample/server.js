const express = require('express');
const { MongoClient } = require('Mongodb');

const connectionstring = "mongodb://localhost:27017";

async function init() {
	const client = new MongoClient(connectionstring, {
		useUnifiedTopology: true
	});
	await client.connect();

	const app = express();

	app.get('/get', async (req, res) => {
		const db = await client.db("foodrank");
		const collection = db.collection("foods")

		const foods = await collection.find(
			{
				$text: { $search: req.query.search }
			},
			{ _id: 0 }
		)
		.sort({ score: { $meta: "textScore" } })
		.limit(10)
		.toArray();

		res.json({ status: "ok", pets }).end();
	})
	const PORT = 3000;
	app.use(express.static('./static'))
	app.listen(PORT);
	console.log(`running on http://localhost:${PORT}`);
}

init();