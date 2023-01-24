import express from 'express'
import {list, add, deletePost, edit, like} from '../controllers/postController.js'

import {addComment, deleteComment, editComment, editCommentJS} from '../controllers/commentController.js'

import multerMiddleware from '../config/multer-cloudinary.js'
import auth from '../middlewares/auth.js'

const router = express.Router()


router.get('/list', auth, list)
router.post('/add', auth, multerMiddleware.single('image'), add)
router.delete('/delete', auth, deletePost)
router.put('/edit', auth, edit)
router.patch('/likes', auth, like)

// Comments section
router.post('/comments/add', auth, addComment)
router.delete('/comments/delete/:postId/:commentId', auth, deleteComment)
router.patch('/comments/edit', auth, editCommentJS)

export default router