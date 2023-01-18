import express from 'express';
import {list, add, deletePost, edit} from '../controllers/postController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/list', auth, list)
router.post('/add', auth, add)
router.delete('/delete', auth, deletePost)
router.put('/edit', auth, edit)

export default router

