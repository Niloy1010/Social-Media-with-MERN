const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require('../../models/Posts');
const { findOneAndUpdate } = require("../../models/Profile");
const validatePostInput = require('../../validation/post');
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
  console.log(req.user);
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
    console.log(post);
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
      return res.status(400).json({alreadyLiked: "User already liked this post"});
    }
    post.likes.unshift({user: req.user.id});
    post.save().then(post=> res.json(post))
    .catch(err=> res.status(400).json(err))
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
  console.log(errors);
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
    post.comments.unshift(newComment);
    post.save().then(post=> {
      res.json(post);
    })
    .catch(err=> res.status(400).json({error: "cannot comment"}));
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
