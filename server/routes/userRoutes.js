import express from 'express'
import {register, login, emailConfirm, forgotPass, changePass, logout, updateProfile} from '../controllers/userController.js'
import auth from '../middlewares/auth.js'
import multerMiddleware from '../config/multer-cloudinary.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/emailconfirm', emailConfirm)
router.post('/forgotpass', forgotPass)
router.post('/changepassword', changePass)
router.get('/logout', logout)
router.post('/profile', auth, multerMiddleware.single('image'), updateProfile)

export default router