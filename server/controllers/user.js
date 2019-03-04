const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');

function validateUser(req) {
	const { email, username, password, firstName, lastName, age, imageUrl } = req.body;
	let messages = [];

	if (!email || email.length === 0) {
		messages.push('Email is empty.');
	}
	
	if (email.indexOf('@') === -1) {
		messages.push('Invalid email.');
	}

	if (!username || username.length < 4) {
		messages.push('Username must be more than 3 symbols.');
	}

	if (!password || password.length < 4) {
		messages.push('Password must be more than 3 symbols.');
	}

	if (!firstName || firstName.length < 4) {
		messages.push('First name must be more than 3 symbols.');
	}

	if (!lastName || lastName.length < 4) {
		messages.push('Last name must be more than 3 symbols.');
	}

	if (isNaN(age) || Number(age) < 0) {
		messages.push('Age must be positive number.');
	}
	
	if (imageUrl.length !== 0 && !imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
		messages.push('Image must start with http or https.');
	}

	return messages;
}

module.exports = {
	register: (req, res) => {
		const { email, username, password, firstName, lastName, age, imageUrl } = req.body;
		const messages = validateUser(req);

		if (messages.length > 0) {
			res.status(422).json({ messages: messages });
			return;
		}

		const salt = encryption.generateSalt();
		const hashedPassword = encryption.generateHashedPassword(salt, password);
		User.create({
			email,
			username,
			firstName,
			lastName,
			age: Number(age),
			hashedPassword,
			salt,
			imageUrl,
			roles: ['User']
		}).then((user) => {
			res.status(201)
				.json({ success: true, message: 'User created!', userId: user._id });
		})
			.catch((error) => {
				if (!error.statusCode) {
					error.statusCode = 500;
				}

				res.status(error.statusCode).json({ success: false, messages: [error.message] });
			});
	},
	login: (req, res) => {
		const { email, password } = req.body;

		User.findOne({ email: email })
			.then((user) => {
				if (!user) {
					const error = new Error('A user with this email could not be found');
					error.statusCode = 401;
					throw error;
				}

				if (!user.authenticate(password)) {
					const error = new Error('A user with this email could not be found');
					error.statusCode = 401;
					throw error;
				}

				const token = jwt.sign({
					email: user.email,
					username: user.username,
					userId: user._id.toString()
				}
					, 'somesupersecret'
					, { expiresIn: '1h' });

				res.status(200).json(
					{
						success: true, 
						message: 'User successfully logged in!',
						token,
						user: user
					});
			})
			.catch(error => {
				if (!error.statusCode) {
					error.statusCode = 500;
				}

				res.status(error.statusCode).json({ success: false, message: error.message });
			})
	},
	getAll: async (req, res, next) => {
		try {
			const currentUser = await User.findById(req.user.userId);
			if (currentUser.roles.indexOf('Admin') === -1) {
				let error = new Error('You are not admin.');
				error.statusCode = 401;
				throw error;
			}

			const users = await User.find({})
				.where('roles').nin(['Admin']);
			res.status(200).json({ success: true, users });
		} catch (err) {
			next(err);
		}
	},
	block: async (req, res, next) => {
		const {userId} = req.params;

		try {
			const currentUser = await User.findById(req.user.userId);
			if (currentUser.roles.indexOf('Admin') === -1) {
				let error = new Error('You are not admin.');
				error.statusCode = 401;
				throw error;
			}

			const user = await User.findById(userId);
			if (user.blocked) {
				let error = new Error('User has already been blocked.');
				error.statusCode = 403;
				throw error;
			}

			user.blocked = true;
			await user.save();
			res.status(200).json({ success: true, message: 'Blocked successful.' });
		} catch (err) {
			next(err);
		}
	},
	unblock: async (req, res, next) => {
		const {userId} = req.params;

		try {
			const currentUser = await User.findById(req.user.userId);
			if (currentUser.roles.indexOf('Admin') === -1) {
				let error = new Error('You are not admin.');
				error.statusCode = 401;
				throw error;
			}

			const user = await User.findById(userId);
			if (!user.blocked) {
				let error = new Error('User is not blocked.');
				error.statusCode = 403;
				throw error;
			}

			user.blocked = false;
			await user.save();
			res.status(200).json({ success: true, message: 'Unblock user successful.' });
		} catch (err) {
			next(err);
		}
	},
    profile: async (req, res, next) => {
        const { username } = req.params;

        try {
            const currentUser = await User.findById(req.user.userId);
            if (currentUser.roles.indexOf('Admin') === -1 && username !== currentUser.username) {
                let error = new Error('You are not admin.');
                error.statusCode = 401;
                throw error;
            }

            const user = await User.findOne({ username })
                .populate('comments')
                .populate({ 
					path: 'boughtClothes',
					populate: {
						path: 'category',
						model: 'Category'
					} 
				})
                .populate({ 
					path: 'soldClothes',
					populate: {
						path: 'category',
						model: 'Category'
					} 
				});

            if (!user) {
                let error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({ success: true, user });
        } catch (err) {
            next(err);
        }
    }
}