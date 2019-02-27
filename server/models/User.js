const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: Schema.Types.String,
		required: [true, 'Email is required.'],
		unique: true
	},
	hashedPassword: {
		type: Schema.Types.String,
		required: true
	},
	username: {
		type: Schema.Types.String,
		required: [true, 'Username is required.'],
		unique: true
	},
	salt: {
		type: Schema.Types.String,
		required: true
	},
	imageUrl: {
		type: Schema.Types.String,
		default: 'https://www.animuspilates.hu/_files/velemenyek/profil_image.png'
	},
	age: {
		type: Schema.Types.Number,
		required: [true, 'Age is required.']
	},
	firstName: {
		type: Schema.Types.String,
		required: [true, 'First name is required.']
	},
	lastName: {
		type: Schema.Types.String,
		required: [true, 'Last name is required.']
	},
	money: {
		type: Schema.Types.Number,
		default: 10
	},
	blocked: {
		type: Schema.Types.Boolean,
		default: false
	},
	boughtClothes: [{
		type: Schema.Types.ObjectId,
		ref: 'Dress'
	}],
	soldClothes: [{
		type: Schema.Types.ObjectId,
		ref: 'Dress'
	}],
	cart: [{
		type: Schema.Types.ObjectId,
		ref: 'Dress'
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	roles: [{
		type: Schema.Types.String,
		enum: ['Admin', 'User']
	}]
});

userSchema.method({
	authenticate: function (password) {
		const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

		return currentHashedPass === this.hashedPassword;
	}
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
        return User.create({
            email: 'admin@abv.bg',
            username: 'Admin',
            firstName: 'Admin',
            lastName: 'Adminov',
            age: 12,
            salt,
            hashedPassword: hashedPass,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;