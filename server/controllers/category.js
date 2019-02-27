const Category = require('../models/Category');
const User = require('../models/User');

module.exports = {
	createPost: (req, res, next) => {
		const { name, dress } = req.body;

		if (!name || name.length < 3) {
			res.status(422).json({ success: false, message: 'Name must be more than 3 symbols.' });
			return;
		}

		const { userId } = req.user;

		User.findOne({ _id: userId })
			.then((user) => {
				if (!user) {
					let error = new Error('User no found.');
					error.statusCode = 404;
					throw error;
				}

				if (user.roles.indexOf('Admin') === -1) {
					let error = new Error('You are not admin.');
					error.statusCode = 401;
					throw error;
				}

				return Category.create({ name, dress });
			})
			.then((category) => {
				return res.status(201).json({
						success: true,
						message: 'Category created successfully!',
						category
					})
			})
			.catch((error) => {
				next(error);
			});
	},
	getAll: (req, res, next) => {
		Category.find({})
			.then((categories) => {
				res.status(200).json({ success: true, categories });
			})
			.catch((error) => {
				next(error);
			});
	}
}