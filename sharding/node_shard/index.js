const app = require("express")();
const { Client } = require("pg");
const crypto = require("crypto");
const HR = require("hashring");
const hashRing = new HR();

hashRing.add("5432");
hashRing.add("5433");
hashRing.add("5434");

const clients = {
	"5432" : new Client ({
		"host": "localhost",
		"port": "5432",
		"user": "postgres",
		"password": "password",
		"database": "postgres"
	}),
	"5433" : new Client ({
		"host": "localhost",
		"port": "5433",
		"user": "postgres",
		"password": "password",
		"database": "postgres"
	}),
	"5434" : new Client ({
		"host": "localhost",
		"port": "5434",
		"user": "postgres",
		"password": "password",
		"database": "postgres"
	})
}

connect();

async function connect() {
	try {
		await clients["5432"].connect();
		console.log("5432 connected");
		await clients["5433"].connect();
		console.log("5433 connected");
		await clients["5434"].connect();
		console.log("5434 connected");
		console.log("finito!")
	} catch (e) {
		console.error(e)
	}
}

app.get("/", (req, res) => {
	res.send("a")
})

app.get("/:urlId", async (req, res) => {
	const urlId = req.params.urlId;
	const server = hashRing.get(urlId)

	const result = await clients[server].query("SELECT * FROM URL_TABLE WHERE URL_ID = $1", [urlId]);

	console.log(result)

	if (result.rowCount == 0) {
		res.sendStatus(404);
	}

	res.send({
		urlId,
		url,
		server
	})

})

app.post("/", async (req, res) => {
	const url = req.query.url;

	// consistently hash this to get a port!
	const hash = crypto.createHash("sha256").update(url).digest("base64");
	const urlId = hash.substring(0, 5);
	const server = hashRing.get(urlId);

	await clients[server].query("INSERT INTO URL_TABLE (URL, URL_ID) VALUES ($1, $2)", [url, urlId]);

	res.send({
		urlId,
		url,
		server
	})

})

app.listen(8081, () => console.log("Listening to 8081"));