import express from 'express'
import {register, login, emailConfirm, forgotPass, changePass, logout, updateProfile} from '../controllers/userController.js'
import auth from '../middlewares/auth.js'

import multer from 'multer'

import cloudinaryV2 from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import dotenv from 'dotenv'

dotenv.config()

const cloudinary = cloudinaryV2.v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'e04',
      format: async (req, file) => {
        console.log('file inside multer', file)

        let extension = ''

        if (file.mimetype.includes('image')) extension = file.mimetype.slice(6)

        return extension
    },
      public_id: (req, file) => `${req.user}-profileImage`,
    },
  });

const multerMiddleware = multer({storage})

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/emailconfirm', emailConfirm)
router.post('/forgotpass', forgotPass)
router.post('/changepassword', changePass)
router.get('/logout', logout)
router.post('/profile', auth, multerMiddleware.single('image'), updateProfile)

export default router