const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayPicture: {
    type: String,
  },
  date: {
    type: String,
    default: Date.now(),
  },
  notifications: [
    {
      senderName: {
        type: String,
        required:true
      },
      senderId: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
      },
      postId: {
        type: Schema.Types.ObjectId,
        ref: 'posts' 
      },
      type: {
        type: String,
        required: true
      },
      read: {
        type: Boolean
      },
      text: {
        type: String,
        required: true
      },
      date:{
        type: Date,
        default: Date.now()
      }


    }
  ]
});

const User = mongoose.model("users", userSchema);
module.exports = User;
