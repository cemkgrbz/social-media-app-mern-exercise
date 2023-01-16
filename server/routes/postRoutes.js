import express from 'express';
import { list, add } from '../controllers/postController.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/list', auth, list)
router.post('/add', auth, add)


export default router

