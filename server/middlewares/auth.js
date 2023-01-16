import jwt from "jsonwebtoken"

export default function auth(req, res, next) {

    try {
        console.log("🚀 ~ hello auth ")

        const token = req.cookies['e04']

        const decoded = jwt.verify(token, process.env.JWT)

        req.user = decoded.id

        next()
        
    } catch (error) {
        console.log("🚀 ~ auth ~ error", error.message)

        res.send({success: false, error: error.message})
        
    }

}