const mongoose = require("mongoose");
const { post } = require("../routes/api/users");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text : {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    displayPicture : {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users' 
            },
            name: String
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true,
            },
            name: {
                type: String
            },
            displayPicture: {
                type: String
            },
            Date : {
                type: Date,
                default: Date.now
            }

        }
    ]

})

module.exports = Post = mongoose.model("posts", postSchema);