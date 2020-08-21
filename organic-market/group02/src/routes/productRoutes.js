const express = require('express');
const debug = require('debug')('app:heroRoutes');
const { MongoClient, ObjectID } = require('mongodb');
const path = require('path');
const DATABASE_CONFIG = require("../database/DATABASE_CONFIG");
const ROUTES = require('./ROUTES');

const productRoutes = express.Router();

function router(nav) {
	productRoutes
		.route('/')
		.post((req, res) => {
			(async function deleteProductFromList() {
				let client;
				try {
					const { deleteProduct } = req.body;
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const collection = db.collection(DATABASE_CONFIG.productCollection);

					await collection.deleteOne({ _id: new ObjectID(deleteProduct) });
					res.redirect(ROUTES.products.path);
				} catch (error) {
					debug(error.stack);
				}
			})();
		})
		.get((req, res) => {
			(async function getAllProducts() {
				let client;
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const colection = db.collection(DATABASE_CONFIG.productCollection);
					const products = await colection.find().sort({ name: 1 }).toArray();

					res.render('index', {
						nav,
						body: ROUTES.products.page,
						title: ROUTES.products.title,
						products,
						ROUTES
					});
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		});

	productRoutes
		.route('/create')
		.all((req, res, next) => {
			if (req.user) {
				next();
			} else {
				res.redirect(ROUTES.signin.path);
			}
		})
		.post((req, res) => {
			let client;
			(async function createHero() {
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const collection = db.collection(DATABASE_CONFIG.heroCollection);
					const objectWithGreatestId = await collection.find().sort({ id: -1 }).limit(1).toArray();
					const newId = objectWithGreatestId[0].id + 1;
					const { createHeroWithName } = req.body;
					const sluggedName = createHeroWithName.replace(/\s/g, '-');
					const newSlug = `${newId}-${sluggedName}`;
					await collection.insertOne({ id: newId, name: createHeroWithName, slug: newSlug }, (error, response) => {
						if (error) { throw error }
						res.redirect(`/heroes/${newSlug}`);
					});
					debug(req.body);
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		})
		.get((req, res) => {
			res.render('index', {
				nav,
				body: ROUTES.hero.page,
				title: ROUTES.hero.title,
				hero: res.hero,
				ROUTES
			});
		});

	productRoutes
		.route('/:heroSlug')
		.all((req, res, next) => {
			if (req.user) {
				const { heroSlug } = req.params;
				(async function getHero() {
					let client;
					try {
						client = await MongoClient.connect(DATABASE_CONFIG.url);
						debug('Connection to db established...');
						const db = client.db(DATABASE_CONFIG.dbName);
						const collection = db.collection(DATABASE_CONFIG.heroCollection);
						res.hero = await collection.findOne({ slug: heroSlug });
						debug(res.hero);
						next();
					} catch (error) {
						debug(error.stack);
					}
					debug('Connection to db closed.');
					client.close();
				})();
				next();
			} else {
				res.redirect(ROUTES.signin.path);
			}
		})
		.post((req, res) => {
			const updateQuery = { $set: req.body };
			const { heroSlug } = req.params;
			const filter = { slug: heroSlug };
			let client;
			(async function editHero() {
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const collection = db.collection(DATABASE_CONFIG.heroCollection);
					collection.updateOne(filter, updateQuery, (error, response) => {
						if (error) { throw error }
						debug(response);
						res.redirect(ROUTES.heroes.path);
					});
					debug(req.body);
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		})
		.get((req, res) => {
			res.render('index', {
				nav,
				body: ROUTES.hero.page,
				title: ROUTES.hero.title,
				hero: res.hero,
				ROUTES
			});
		});

	return productRoutes;
}

module.exports = router;
