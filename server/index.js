const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const dressRoutes = require('./routes/dress');
const cartRoutes = require('./routes/cart');
const commentRoutes = require('./routes/comment');
require('./database/database')();
const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/dress', dressRoutes);
app.use('/cart', cartRoutes);
app.use('/comment', commentRoutes);

// General error handling
app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ success: false, message: message });
	next();
})

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });