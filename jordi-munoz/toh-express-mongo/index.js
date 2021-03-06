const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressSession({ secret: 'heroes' }));

require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
	{ link: '/', title: 'Dashboard' },
	{ link: '/heroes', title: 'Heroes' },
	{ link: '/auth/signin', title: 'Signin' },
];


app.get('/', (req, res) => {

	const url = 'mongodb://localhost:27017';
	const dbName = 'shieldHeroes';
	let client;
	(async function query() {
		try {
			if (req.user) {
				client = await MongoClient.connect(url);
				debug('Connection stablished...');

				const db = client.db(dbName);

				const collection = await db.collection('heroes');

				const heroesList = await collection.find().toArray();

				res.render('dashboard', {
					nav,
					title: 'Dashboard',
					heroes: heroesList.slice(0, 4)
				});
			} else {
				res.redirect('/auth/signin');
			}

		} catch (error) {
			debug(error.stack);
		}
		client.close();
	})();

});

const heroRoutes = require('./src/routes/heroRoutes')(nav);

app.use('/heroes', heroRoutes);

const shieldRoutes = require('./src/routes/shieldRoutes')(nav);

app.use('/shield', shieldRoutes);

const authRoutes = require('./src/routes/authRoutes')(nav);

app.use('/auth', authRoutes);

app.listen(port, () => debug(`Listening on port ${chalk.green(port)}`));
