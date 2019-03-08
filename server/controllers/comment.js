const Comment = require('../models/Comment');
const User = require('../models/User');
const Dress = require('../models/Dress');

module.exports = {
	create: async (req, res, next) => {
        const { dressId } = req.params;
        const { userId } = req.user;
        const {message, rating} = req.body;

        if (!message || message.length < 5 || message.length > 30) {
            res.status(400).json({ success: false, message: 'Message length is between 5 and 30 symbols.' });
            return;
        }

        if (!rating || isNaN(rating) || Number(rating) < 1 || Number(rating) > 5) {
            res.status(400).json({ success: false, message: 'Rating is number between 1 and 5.' });
            return;
        }

        try {
            const user = await User.findById(userId);
            if (user.blocked) {
                let error = new Error('You are blocked.');
                error.statusCode = 401;
                throw error;
            }
            
            const comment = await Comment.create({
                message,
                rating: Number(rating),
                creator: userId,
                dress: dressId
            });
            user.comments.push(comment.id);
            await user.save();

            const dress = await Dress.findById(dressId);
            dress.comments.push(comment.id);
            await dress.save();
            res.status(201).json({ success: true, message: 'Comment created successful.', comment });
        } catch (err) {
            next(err);
        }
    },
    remove: async (req, res, next) => {
        const {commentId} = req.params;

        try {
            const comment = await Comment.findById(commentId);
            
            if (!comment) {
                const error = new Error('Comment not found.');
                error.statusCode = 404;
                throw error;
            }

            const user = await User.findById(comment.creator);

            if (user.roles.indexOf('Admin') === -1 && comment.creator.toString() !== user.id) {
                const error = new Error('You dont have permissions.');
                error.statusCode = 401;
                throw error;
            }

            const dress = await Dress.findById(comment.dress);
            const indexDress = dress.comments.indexOf(comment.id);

            if (indexDress === -1) {
                const error = new Error('Comment not found.');
                error.statusCode = 404;
                throw error;
            }
            dress.comments.splice(indexDress, 1);
            await dress.save();

            const indexUser = user.comments.indexOf(comment.id);
            user.comments.splice(indexUser, 1);
            await user.save();

            await Comment.findByIdAndRemove(commentId);
            res.status(200).json({ success: true, message: 'Comment removed successful.' });
        } catch (err) {
            next(err);
        }
    },
    getByDressId: async (req, res, next) => {
        const { dressId } = req.params;

        try {
            const comments = await Comment.find({ dress: dressId })
				.sort({ creationDate: -1 });
            res.status(200).json({ success: true, comments });
        } catch (err) {
            next(err);
        }
    }
}