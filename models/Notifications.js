const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user : 
    { 
       type: Schema.Types.Object,
        ref: 'users'
    },
    notifications:[
        {
            text: {type: String},
            date: {type: Date},
            user: {
                type: Schema.Types.Object,
                ref: 'users'
            },
            displayPicture: {type: String},
            postId : {
                type: Schema.Types.Object,
                ref: 'posts'
            },
            name: {type: String},
            likeId:{
                type: Schema.Types.Object,
                ref: 'likes'
            },
            commentId:{
                type: Schema.Types.Object,
                ref: 'comments'
            }
        }
    ]

}
);
module.exports = Notification = mongoose.model("notifications", notificationSchema);