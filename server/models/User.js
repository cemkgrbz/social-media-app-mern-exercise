import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // enum: {
        //     values: ['a', 'b', 'c'],
        //     message: 'You are not allowed to get registered'
        // },
        // validate: {
        //     validator: (value) => /\d{3}-\d{3}-\d{4}/.test(value),
        //     message: props => `${props.value} is not a valid phone number!`
        //     },
        // minlength: [2, 'Very short email'],
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    address: String,
    age: Number,
    hobbies: [String],
    gender: String,
    verified: {
        type: Boolean,
        default: false
    }
}, {timeStamps: true})

export default mongoose.model('User', userSchema)