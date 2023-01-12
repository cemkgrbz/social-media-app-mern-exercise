import express from 'express'
import {register, login, emailConfirm, forgotPass, changePass} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/emailconfirm', emailConfirm)
router.post('/forgotpass', forgotPass)
router.post('/changepassword', changePass)

export default router