const { faker } = require('@faker-js/faker');
const axios = require('axios');

function run() {
	for (i = 0 ; i < 1000 ; i++) {
		axios.post(`http://localhost:8081/?url=${faker.internet.url()}`)
		.then(response => console.log(response.data));
	}
}

run();