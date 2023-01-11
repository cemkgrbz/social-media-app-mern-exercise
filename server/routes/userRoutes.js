import express from 'express'
import {register, login, emailConfirm} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/emailconfirm', emailConfirm)

export default router