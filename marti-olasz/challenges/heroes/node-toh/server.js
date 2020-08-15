const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(express.static('src'));

server.get('/', (request, response) => {
	response.render('dashboard.ejs');
});

server.get('/list', (request, response) => {
	response.render('list.ejs');
});

server.get('/hero', (request, response) => {
	response.render('hero.ejs');
});

server.listen(2020, () => {
	console.log('Server running...');
});
