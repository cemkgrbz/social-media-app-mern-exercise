import Post from '../models/Post.js';

export const add = async (req, res) => {

    try {
        console.log("🚀 ~ hello add ", req.body)

        req.body.owner = req.user

        const post = await Post.create(req.body)
        console.log("🚀 ~ add ~ post", post)

        res.send({success: true, post})
        
    } catch (error) {
        console.log("🚀 ~ add ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}

export const list = async (req, res) => {

    try {
        console.log("🚀 ~ hello list ")

        const posts = await Post
        .find()
        .select('-__v')

        res.send({success: true, posts})
        
    } catch (error) {
        console.log("🚀 ~ list ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}