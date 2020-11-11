const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require('../../models/Posts');
const validatePostInput = require('../../validation/post');
const validatePostImageInput = require('../../validation/validatePostImageInput');


const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const keys = require("../../config/keys");

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1103725",
  key: "b0336431ec4d3b049e2c",
  secret: "7a4078ca0f16e095ed68",
  cluster: "us2",
  useTLS: true
});


var storage = new GridFsStorage({
  url: keys.mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.log("Error");
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });




//@route GET api/Posts/test
//@desc TESTS Posts route
//@access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Posts works",
  });
});

//@route POST api/posts
//@desc create Posts
//@access Private
router.post('/',passport.authenticate('jwt', {session: false}), (req,res)=> {
  
  const {errors, isValid} = validatePostInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    displayPicture: req.user.displayPicture,
    user: req.user.id
  })

  newPost.save().then(post=> {
   
    res.json(post)
  })
  .catch(err=> res.status(400).json({post: "Cannot post"}));
} )




//@route POST api/posts/image
//@desc create Posts with Image
//@access Private
router.post('/image',passport.authenticate('jwt', {session: false}),
upload.single('file'),
 (req,res)=> {
  
  const {errors, isValid} = validatePostImageInput(req);
  if(!isValid) {
    console.log("invalid");
    return res.status(400).json(errors);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    displayPicture: req.user.displayPicture,
    user: req.user.id,
    hasImage: true,
    image: `http://localhost:5000/api/users/profilepicture/${req.file.id}`
  })

  newPost.save().then(post=> {
   
    res.json(post)
  })
  .catch(err=> res.status(400).json({post: "Cannot post"}));
} )


//@route GET api/Posts
//@desc get all post
//@access PUBLIC
router.get('/', (req, res)=> {
  Post.find().sort({date: -1}).then(posts=> {
    res.json(posts);
  })
  .catch(err => res.status(404).json({
    post: "No posts found"
  }))
})



//@route GET api/posts/:id
//@desc get single post
//@access PUBLIC

router.get('/:id', (req,res)=> {
  Post.findById(req.params.id).then(post=> {
    res.json(post)
  })
  .catch(err => res.status(404).json({post: "No post found"}))
})


//@route DELETE api/posts/:id
//@desc delete single post
//@access PUBLIC

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res)=> {
  Profile.findOne({user: req.user.id}).then(profile=> {
    Post.findById(req.params.id).then(post=> {
      if(post.user.toString() !==req.user.id) {
        return res.status(401).json({
          notAuthorized: "User not authorized"
        })
      }
      post.remove()
      .then(()=> {
        res.json({status: "Success"});
      })
      .catch(err=> res.status(400).json({
        status: "failed to delete",
        error : err
      }))
    })
    .catch(err=> res.status(400).json({status: "could not find post"}))
  })
  .catch(err=> res.status(404).json({error: "User not found"}));
})


//@route Update api/posts/:id
//@desc update single post
//@access private
router.put('/:id', passport.authenticate('jwt',{session: false}), (req,res)=> {
  Profile.findOne({user: req.user.id}).then(profile=> {
    Post.findById(req.params.id).then(post=> {
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({notAuthorized: "User not authorized"});
      }
      Post.findOneAndUpdate({_id : req.params.id}, {text: req.body.text}, {upsert: true,useFindAndModify: false})
      .then(post=> {
        res.json(post)
      })
      .catch(err=> res.status(400).json(err))
    })
    .catch(err=> res.status(404).json({error: "post not found"}));
  })
  
  .catch(err=> res.status(404).json({error: "User not found"}));
})



//@route Update api/posts/like/:id (post id)
//@desc add like to post
//@access private
router.post('/like/:id', passport.authenticate('jwt',{session: false}), (req,res)=> {
  if(req.params && req.params.id) {   
    Post.findById(req.params.id).then(post=> {
    if(post.likes.filter(like => like.user.toString() == req.user.id).length>0) {
      console.log("UN");
      const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
      post.likes.splice(removeIndex,1);
      console.log(post.likes);
      post.save().then(post=> 
         res.json(post)
      )
      .catch(err=> res.status(400).json(err));
      return ;
    }
    console.log("OUT");
    post.likes.unshift({
      user: req.user.id,
      name: req.body.name,
      displayPicture: req.body.displayPicture
    });
    User.findById(post.user).then(user=> {
      if(user.notifications.
      filter(notification=> notification.postId.toString() === post.id && notification.type==="Like").length>0){

        
        user.save().then(()=> {
          post.save().then(post=> res.json(post))
          .catch(err=> res.status(400).json(err))
        })
      }
      else if(user._id.toString()===req.user._id.toString()){
        user.save().then(()=> {
          post.save().then(post=> res.json(post))
          .catch(err=> res.status(400).json({err:"Error"}))
        })
        .catch(err=> res.status(400).json({error:"Error"}))
      }
      else{
        user.notifications.push({
          senderName: req.user.name,
          senderId: req.user.id,
          postId: req.params.id,
          type: "Like",
          text: req.user.name + " liked your post",
          read: false
        })
        user.hasNotification= true;
        
        pusher.trigger("notification", "push-notification", {
          message: "notification"
        });
        user.save().then(()=> {
          post.save().then(post=> res.json(post))
          .catch(err=> res.status(400).json(err))
        })
      }
      
     
    })
    .catch(err=> res.status(400).json({notFound: "User not found"}));
   
  })
  .catch(err=> res.status(404).json({notfound: "Post not found"}))
}
else{
  console.log("No parameter found")
}
})

//@route Update api/posts/unlike/:id (post id)
//@desc add like to post
//@access private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}),(req,res)=> {
  Post.findById(req.params.id).then(post=> {
    if(post.likes.filter(like => like.user.toString() == req.user.id).length==0) {
      return res.status(400).json({noLike: "Not liked anyway"});
    }
    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex,1);
    post.save().then(post=> {
      res.json(post)
    })
    .catch(err=> res.status(400).json(err))
  })
  .catch(err=> res.status(404).json({notFound: "Post not found"}))
})


//@route Comment api/posts/comment/:id (post id)
//@desc add like to post
//@access private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req,res)=> {

  const {errors, isValid} = validatePostInput(req.body);
  
  if(!isValid) {
    return res.status(400).json(errors);
  }
  // const newPost = new Post({
  //   text: req.body.text,
  //   name: req.body.name,
  //   avatar: req.body.avatar,
  //   user: req.user.id
  // })
  Post.findById(req.params.id).then(post=> {
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      displayPicture: req.body.displayPicture,
      user: req.user.id
    };
    User.findById(post.user).then(user=> {
      user.notifications.push({
        senderName: req.user.name,
        senderId: req.user.id,
        postId: req.params.id,
        type: "Comment",
        text: req.user.name + " commented on your post",
        read: false
      })
      
      user.hasNotification= true;
      pusher.trigger("notification", "push-notification", {
        message: "hello world"
      });
      user.save().then(()=> {
        post.comments.unshift(newComment);
        post.save().then(post=> {
          res.json(post);
        })
        .catch(err=> res.status(400).json({error: "cannot comment"}));
      })
    })
    .catch(err=> res.status(400).json({"error": "User not found"}))


  })
  .catch(err=> res.status(404).json({notFound: "Post not found"}))
})


//@route DELETE comment api/posts/comment/:id/:comment_id (post id)
//@desc remove comment
//@access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req,res)=> {


  Post.findById(req.params.id).then(post=> {
   
    if(post.comments.filter(comment => comment._id.toString()===req.params.comment_id).length ==0) {
      return res.status(404).json({
        notFound : "Comment not found"
      })
    }

    const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex,1);
    post.save().then(post => res.json(post))
    .catch(err => res.status(400).json(err))
  })
  .catch(err=> res.status(404).json({notFound: "Post not found"}))
})



module.exports = router;
