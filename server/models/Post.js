import mongoose, { Types } from "mongoose";

const {Schema} = mongoose

const postSchema = new Schema({

        text: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
}
)

export default mongoose.model('Post', postSchema)