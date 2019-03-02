const Dress = require('../models/Dress');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Category = require('../models/Category');
const itemsPerPage = 6;

function validateDress({ cost, name, imageUrl, size, description }) {
    const errors = [];

    if (isNaN(cost) || Number(cost) < 0.01) {
        errors.push('Cost must be positive number.');
    }

    if (name.length < 4) {
        errors.push('Name must be more then 3 symbols.');
    }

    if (!imageUrl.startsWith('http') && !imageUrl.startsWith('https')) {
        errors.push('Image must start with http or https.');
    }

    if (size.length === 0) {
        errors.push('Size is empty.');
    }

    if (!description || description.length < 10 || description.length > 150) {
        errors.push('Description must be between 10 and 150 symbols.');
    }

    return errors;
}

async function getDress(page, itemsCount) {
    if (!itemsCount) {
        itemsCount = itemsPerPage;
    }

    const skippedItems = itemsCount * (page - 1);
    const totalItems = await Dress
        .where('userCart').equals(undefined)
        .where('isBought').equals(false)
        .skip(skippedItems)
        .limit(itemsCount)
        .sort({ creationDate: -1 })
        .populate('category');

    return totalItems;
}

module.exports = {
    getByPage: async (req, res, next) => {
        const page = Number(req.params.page);

        try {
            if (!page) {
                let error = new Error('Invalid params.');
                error.statusCode = 400;
                throw error;
            }
            const dress = await getDress(page);
            res.status(200).json({ success: true, dress });
        } catch (err) {
            next(err);
        }
    },
    getByPageAndItems: async (req, res, next) => {
        const page = Number(req.params.page);
        const itemsCount = Number(req.params.itemsCount);

        try {
            if (!page || !itemsCount) {
                let error = new Error('Invalid params.');
                error.statusCode = 400;
                throw error;
            }

            if (itemsCount > 12) {
                let error = new Error('Max of items count is 12.');
                error.statusCode = 400;
                throw error;
            }

            const dress = await getDress(page, itemsCount);
            res.status(200).json({ success: true, dress });
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        const { category, cost, name, imageUrl, size, description } = req.body;
        const messages = validateDress(req.body);

        if (messages.length !== 0) {
            res.status(422).json({ success: false, errors: messages });
            return;
        }

        const { userId } = req.user;
        try {
            const current = await Category.findById(category);
            if (!current) {
                let error = new Error('Category not found.');
                error.statusCode = 401;
                throw error;
            }

            const user = await User.findById(userId);
            if (!user) {
                let error = new Error('User not found.');
                error.statusCode = 401;
                throw error;
            }

            if (user.blocked) {
                let error = new Error('You are blocked.');
                error.statusCode = 401;
                throw error;
            }

            const dress = await Dress.create({
                category,
                cost: Number(cost),
                name,
                imageUrl,
                size: size,
                description,
                creator: userId
            });

            user.soldClothes.push(dress._id);
            await user.save();
            current.clothes.push(dress._id);
            await current.save();
            res.status(200).json({
                success: true,
                message: 'Dress created successfully!',
                dress
            });
        } catch (error) {
            next(error);
        }
    },
    countDress: async (req, res, next) => {
        try {
            const itemsCount = await Dress
                .where('userCart').equals(undefined)
                .where('isBought').equals(false)
                .count();

            res.status(200).json({ count: itemsCount });
        } catch (err) {
            next(err);
        }
    },
    editPost: async (req, res, next) => {
        const { id: dressId } = req.params;
        const { category, cost, name, imageUrl, size, description } = req.body;
        const messages = validateDress(req.body);

        if (messages.length !== 0) {
            res.status(422).json({ success: false, errors: messages });
            return;
        }

        const { userId } = req.user;
        try {
            const current = await Category.findById(category);
            if (!current) {
                let error = new Error('Category not found.');
                error.statusCode = 404;
                throw error;
            }

            const user = await User.findById(userId);
            if (!user) {
                let error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
            }

            const dress = await Dress.findById(dressId);

            if (!dress) {
                let error = new Error('Dress not found.');
                error.statusCode = 404;
                throw error;
            }

            if (user.roles.indexOf('Admin') === -1 && dress.creator.toString() !== user.id) {
                let error = new Error('You dont have permissions.');
                error.statusCode = 401;
                throw error;
            }

            if (dress.category.toString() !== category) {
                const lastCategory = await Category.findById(dress.category);
                let index = lastCategory.clothes.indexOf(dress.id);
                lastCategory.clothes.splice(index, 1);
                await lastCategory.save();

                current.clothes.push(dress.id);
                await current.save();
            }

            dress.category = category;
            dress.cost = Number(cost);
            dress.name = name;
            dress.imageUrl = imageUrl;
            dress.size = size;
            dress.description = description;

            await dress.save();
            res.status(200).json({
                success: true,
                message: 'Dress edited successful!',
                dress
            });
        } catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        const { id: dressId } = req.params;
        const { userId } = req.user;

        try {
            const dress = await Dress.findById(dressId);
            if (!dress) {
                let error = new Error('Dress not found.');
                error.statusCode = 404;
                throw error;
            }
            if (dress.isBought) {
                let error = new Error('Product was bought.');
                error.statusCode = 404;
                throw error;
            }

            const user = await User.findById(userId);
            if (user.roles.indexOf('Admin') === -1 && dress.creator.toString() !== user.id) {
                let error = new Error('You are not owner of this product.');
                error.statusCode = 401;
                throw error;
            }

            for (let commentId of dress.comments) {
                const comment = await Comment.findById(commentId);
                const creatorComment = await User.findById(comment.creator);
                const indexComment = creatorComment.comments.indexOf(commentId);
                creatorComment.comments.splice(indexComment, 1);
                await creatorComment.save();

                await Comment.findByIdAndRemove(comment.id);
            }

            if (dress.userCart) {
                const userCart = await User.findById(dress.userCart);
                const index = userCart.cart.indexOf(dress.id);
                userCart.cart.splice(index, 1);
                await userCart.save();
            }

            const category = await Category.findById(dress.category);
            const indexCategory = category.clothes.indexOf(dress.id);
            category.clothes.splice(indexCategory, 1);
            await category.save();

            const creatorUser = await User.findById(dress.creator);
            const index = creatorUser.soldClothes.indexOf(dress.id);
            creatorUser.soldClothes.splice(index, 1);
            await creatorUser.save();

            await Dress.findByIdAndRemove(dress.id);

            res.status(200).json({
                success: true,
                message: 'Dress removed successful!'
            });
        } catch (err) {
            next(err);
        }
    },
    details: async (req, res, next) => {
        const { id: dressId } = req.params;

        try {
            const dress = await Dress.findById(dressId)
                .populate('comments')
                .populate('category')
                .populate('creator');

            if (!dress) {
                let error = new Error('Dress not found.');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({ success: true, dress });
        } catch (err) {
            next(err);
        }
    },
    getByCategory: async (req, res, next) => {
        const { categoryName } = req.params;

        try {
            const category = await Category
                .findOne({ name: categoryName })
                .populate({ 
					 path: 'clothes',
					 populate: {
					   path: 'category',
					   model: 'Category'
					 } 
				  });

            if (!category) {
                let error = new Error('Category not found.');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({ 
				success: true, 
				dress: category.clothes.filter(c => c.userCart === undefined && c.isBought === false) 
			});
        } catch (err) {
            next(err);
        }
    },
    like: async (req, res, next) => {
        const { dressId } = req.params;
        const { userId } = req.user;

        try {
            const dress = await Dress.findById(dressId);
            if (!dress) {
                let error = new Error('Dress not found.');
                error.statusCode = 404;
                throw error;
            }
            
            const user = await User.findById(userId);
            if (user.blocked) {
                let error = new Error('You are blocked.');
                error.statusCode = 401;
                throw error;
            }

            if (dress.likes.indexOf(user.id) > -1) {
                let error = new Error('You have already like this product.');
                error.statusCode = 403;
                throw error;
            }

            dress.likes.push(user.id);
            await dress.save();
            res.status(200).json({ success: true, message: 'You like this product successfully.' });
        } catch (err) {
            next(err);
        }
    },
    dislike: async (req, res, next) => {
        const { dressId } = req.params;
        const { userId } = req.user;

        try {
            const dress = await Dress.findById(dressId);
            if (!dress) {
                let error = new Error('Dress not found.');
                error.statusCode = 404;
                throw error;
            }
            
            const user = await User.findById(userId);
            if (user.blocked) {
                let error = new Error('You are blocked.');
                error.statusCode = 401;
                throw error;
            }

            const index = dress.likes.indexOf(user.id);
            if (index === -1) {
                let error = new Error('First you must like this product.');
                error.statusCode = 403;
                throw error;
            }

            dress.likes.splice(index, 1);
            await dress.save();
            res.status(200).json({ success: true, message: 'You dislike this product successfully.' });
        } catch (err) {
            next(err);
        }
    }
}
