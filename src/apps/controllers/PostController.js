const Posts = require('../models/Posts');

class PostController {
    async create(req, res) {
        const { image, description } = req.body;

        const newPost = await Posts.create({
            image,
            description,
            author_id: req.userId,
        });

        if (!newPost) {
            return res.status(400).json({ message: 'Created post failed! '});
        }

        return res.status(200).json({ data: {image, description} });
    }

    async delete(req, res) {
        const { id } = req.params;

        const verifyPost = await Posts.findOne({
            where: {
                id,

            },
        });

        if (!verifyPost) {
            return res.status(404).json({ message: 'post does not exits!' });
        }

        if (verifyPost.author_id != req.userId) {
            return res.status(401).json({
                message: 'You don\'t have permission to delete this post! ',
            });
        } 

        const deletePost = await Posts.destroy({
            where: {
                id,
            },
        });

        if (!deletePost) {
            return res.status(400).json({ message: 'Failed to delete this post! '});
        }

        return res.status(200).json({ message: 'Post deleted! '});
    }
}

module.exports = new PostController();