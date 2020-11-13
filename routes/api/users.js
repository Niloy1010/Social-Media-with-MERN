const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/keys").secretOrKey;
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const keys = require("../../config/keys");
const mongoose = require('Mongoose');


const User = require("../../models/User");
const passport = require("passport");
const { session } = require("passport");

//Grid-fs for image uploading
const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1103725",
  key: "b0336431ec4d3b049e2c",
  secret: "7a4078ca0f16e095ed68",
  cluster: "us2",
  useTLS: true
});

//Connection for file upload
//Init Stream
const conn = mongoose.createConnection(keys.mongoURI);
let gfs;
conn.once('open', ()=> {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

//Storage Engine

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

//@route GET api/users/profilePicture/:id {picture id}
//@desc loads form
router.get("/profilepicture/:id", (req,res)=> {
  gfs.files.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
  .then(file=> {
    if(!file || file.length===0) {
      res.status(404).json({"notFound": "File not found"});
    }
    var readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  })
  .catch(err=> res.status(404).json({"notFound": "File not found"}));
})



//@route POST api/users/profilePicture
//@desc Uploads files to DB
router.post("/profilepicture",
passport.authenticate("jwt", { session: false }),
upload.single('file'), (req,res)=> {

  User.findById(req.user.id).then(user=> {
    user.displayPicture = `http://localhost:5000/api/users/profilepicture/${req.file.id}`;
    user.save().then( (user) => {
      
      res.json({user})
    })
    .catch(err=> res.status(400).json({error: "Error occurred"}))
  })
  .catch(err=> res.status(404).json({msg:"User not found"}));

})




//@route GET api/users/test
//@desc TESTS users route
//@access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "User works",
  });
});

//@route POST api/users/register
//@desc Register Users
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        errors.email = "User already exists";
        res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          displayPicture: avatar,
          password: req.body.password,
          hasNotification
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//@route POST api/users/login
//@desc Login Users
//@access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    
    pusher.trigger("notification", "push-notification", {
      message: "hello world"
    });
    if (!user) {
      errors.email = "User not found";
      res.status(404).json(errors);
    } else {
      bcrypt.compare(req.body.password, user.password).then((matched) => {
        if (matched) {
          const payload = {
            id: user.id,
            name: user.name,
            displayPicture: user.displayPicture,
            hasNotification: user.hasNotification,
            notifications: [...user.notifications]
          };

          jwt.sign(payload, secretKey, { expiresIn: "2h" }, (err, token) => {
            res.json({
              success: "true",
              token: "Bearer " + token,
            });
          });
        } else {
          res.status(400).json({ password: "Password Incorrect" });
        }
      });
    }
  });
});

//@route GET api/users/current
//@desc Get current user information
//@access Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      displayPicture: req.user.displayPicture,
      hasNotification: req.user.hasNotification,
      notifications: [...req.user.notifications]
    });
  }
);



//@route GET api/users/notifications
//@desc Get current user information
//@access Public
router.get(
  "/notifications",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   User.findOne({_id: req.user.id})
   .then(user=> {
     res.json(user.notifications);
   })
   .catch(err=>{
     res.status(404).json({notFound:"User not found"})
   })
  }
);

router.get("/displayPicture/:id", (req,res)=> {
  User.findOne({_id: req.params.id})
  .then(user=>
    res.json({"displayPicture": user.displayPicture}))
    .catch(err=> res.status(400).json({"error": "error"}))
})


//@route GET api/users/notifications/visited
//@desc SET current user notification
router.get(
  "/notifications/visited",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   User.findOne({_id: req.user.id})
   .then(user=> {
     user.hasNotification = false;
     user.save().then(resUser=> {
       res.json(resUser)
     })
     .catch(err=> res.status(400).json({error:"User"}))
   })
   .catch(err=>{
     res.status(404).json({notFound:"User not found"})
   })
  }
);



//@route GET api/users/notifications/visited/:id
//@desc SET current user notification
router.get(
  "/notifications/visited/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   User.findOne({_id: req.user.id})
   .then(user=> {
     
     user.notifications.map(notification => notification._id.toString() === req.params.id ? notification.read=true : notification.read=notification.read);
     user.save().then(resUser=> {
       res.json(resUser)
     })
     .catch(err=> res.status(400).json({error:"Error"}))
   })
   .catch(err=>{
     res.status(404).json({notFound:"User not found"})
   })
  }
);


module.exports = router;
