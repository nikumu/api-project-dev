const Posts = require('../models/Posts');
const Users = require('../models/Users');

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

        if (verifyPost.author_id !== req.userId) {
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

    async update(req, res) {
        const { id } = req.params;

        const verifyPost = await Posts.findOne({
            where: {
                id,
            },
        });

        if (!verifyPost) {
            return res.status(404).json({ message: 'post does not exits!' });
        }

        if (verifyPost.author_id !== req.userId) {
            return res.status(401).json({
                message: 'You don\'t have permission to delete this post! ',
            });
        } 

        const postUpdate = await Posts.update(req.body, { where: { id } });

        if (!postUpdate) {
            return res.status(400).json({ message: 'Failed to update this post! '});
        }

        return res.status(200).json({ message: 'Posts updated!'});
    }

    async addLike(req, res) {
        const { id } = req.params;

        const verifyPost = await Posts.findOne({
            where: {
                id,
            },
        });

        if (!verifyPost) {
            return res.status(404).json({ message: 'post does not exits!' });
        }

        const postUpdate = await Posts.update({ number_likes: verifyPost.number_likes + 1 },
            { 
                where: { id },
        });

        if (!postUpdate) {
            return res.status(400).json({ message: 'Failed to add like in this post! '});
        }

        return res.status(200).json({
            message: 'Like storaged!', 
        });
    }

    async listMyPosts(req, res) {
        const allPosts = await Posts.findAll({
            where: {
                author_id: req.userId,
            },
        });

        if (!allPosts) {
            return res.status(400).json( { message: 'Failed to list all posts!' });
        }

        const formattedData = [];

        for (const item of allPosts) {
            formattedData.push({
                id: item.id,
                image: item.image,
                description: item.description,
                number_likes: item.number_likes,
            });
        }
        
        return res.status(200).json({
            data: formattedData,
        });
    }  

    async listAllPosts(req, res) {
        const allPosts = await Posts.findAll({
            include: [
                { model: Users, as: 'user', required: true }
            ],
        });

        return res.status(200).json({
            data: allPosts,
        });
    }
}

module.exports = new PostController();