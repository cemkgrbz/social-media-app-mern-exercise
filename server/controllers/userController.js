import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from '../utilities/email.js'

const SALT_ROUNDS = 10;

export const register = async (req, res) => {

    try {
        console.log("🚀 ~ hello register ", req.body)

        const salt = await bcrypt.genSalt(SALT_ROUNDS)

        const hashedPass = await bcrypt.hash(req.body.password, salt)
        console.log("🚀 ~ file: userController.js:16 ~ register ~ hashedPass", hashedPass)

        req.body.password = hashedPass

        const user = await User.create(req.body)
        console.log("🚀 ~ file: userController.js:21 ~ register ~ user", user)

        const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: '1h'})

        sendEmail(token)

        res.send({success: true})
        
    } catch (error) {
        console.log("register ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}

export const login = async (req, res) => {

    try {
        console.log("🚀 ~ hello login ", req.body)

        const user = await User.findOne({
            $or: [{username: req.body.emailOrUsername}, {email: req.body.emailOrUsername}]
        }).select('-__v')

        console.log("🚀 ~ login ~ user", user)

        if (!user) return res.send({success: false, errorId: 1})

        const passMatch = await bcrypt.compare(req.body.password, user.password)
        console.log("🚀 ~ login ~ passMatch", passMatch)

        if (!passMatch) return res.send({success: false, errorId: 1})

        const newUser = user.toObject()

        delete newUser.password

        const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: '1h'})
        console.log("🚀 ~ login ~ token", token)

        res.cookie('e04', token)
        res.cookie('e041', 'token2')

        res.send({success: true, user: newUser})
        
    } catch (error) {
        console.log("🚀 ~ login ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}

export const emailConfirm = async (req, res) => {

    try {
        console.log("🚀 ~ hello emailConfirm ", req.body)

        const token = req.body.token

        const decoded = jwt.verify(token, process.env.JWT)
        console.log("🚀 ~ emailConfirm ~ decoded", decoded)

        const user = await User.findByIdAndUpdate(
            {_id: decoded.id},
            {verified: true},
            {new: true}
        )
        console.log("🚀 ~ emailConfirm ~ user", user)
       
        res.send({success: true})
        
    } catch (error) {
        console.log("🚀 ~ emailConfirm ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }
}