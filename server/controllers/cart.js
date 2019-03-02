const Dress = require('../models/Dress');
const User = require('../models/User');

module.exports = {
    getCart: async (req, res, next) => {
        const { userId } = req.user;
        try {
            const user = await User.findById(userId)
                .populate({ 
					path: 'cart',
					populate: {
					   path: 'creator',
					   model: 'User'
					},
					populate: {
					   path: 'category',
					   model: 'Category'
					}
				});

            res.status(200).json({ success: true, cart: user.cart });
        } catch (err) {
            next(err);
        }
    },
    add: async (req, res, next) => {
        const { id: dressId } = req.params;
        const { userId } = req.user;

        try {
            const dress = await Dress.findById(dressId);
            const user = await User.findById(userId);

            if (!dress) {
                let error = new Error('Dress not found.');
                error.statusCode = 404;
                throw error;
            }

            if (dress.userCart) {
                let error = new Error('Dress is in another cart.');
                error.statusCode = 402;
                throw error;
            }

            if (dress.isBought) {
                let error = new Error('Dress was sold.');
                error.statusCode = 402;
                throw error;
            }

            if (!user) {
                let error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
            }

            if (userId === dress.creator.toString()) {
                let error = new Error('You are creator of this product.');
                error.statusCode = 402;
                throw error;
            }

            user.cart.push(dress._id);
            await user.save();
            dress.userCart = user._id;
            await dress.save();
            res.status(200).json({ success: true, message: 'Added successfully.' });
        } catch (err) {
            next(err);
        }
    },
    remove: async (req, res, next) => {
        const { id: dressId } = req.params;
        const { userId } = req.user;

        try {
            const dress = await Dress.findById(dressId);
            const user = await User.findById(userId);

            if (!dress) {
                let error = new Error('Dress not found.');
                error.statusCode = 404;
                throw error;
            }

            let index = user.cart.indexOf(dress.id);
            if (index === -1) {
                let error = new Error('Dress missing in your cart.');
                error.statusCode = 404;
                throw error;
            }

            user.cart.splice(index, 1);
            await user.save();
            dress.userCart = undefined;
            await dress.save();
            res.status(200).json({ success: true, message: 'Removed successfully.' });
        } catch (err) {
            next(err);
        }
    },
    checkout: async (req, res, next) => {
        const { userId } = req.user;

        try {
            const user = await User.findById(userId)
                .populate('cart');

            if (user.cart.length === 0) {
                let error = new Error('You cart is empty.');
                error.statusCode = 403;
                throw error;
            }

            let neededMoney = 0;
            for (let product of user.cart) {
                neededMoney += product.cost;
            }

            if (user.money < neededMoney) {
				const diff = neededMoney - user.money;
                let error = new Error(`You dont have enough money. You need ${diff} more.`);
                error.statusCode = 403;
                throw error;
            }

            user.money -= neededMoney;
            for (let product of user.cart) {
                user.boughtClothes.push(product);
                const creator = await User.findById(product.creator);
                creator.money += product.cost;
                await creator.save();
                product.isBought = true;
                await product.save();
            }

            user.cart = [];
            await user.save();
            res.status(200).json({ success: true, message: 'Checkout successfully.', spendMoney: neededMoney });
        } catch (err) {
            next(err);
        }
    }
}