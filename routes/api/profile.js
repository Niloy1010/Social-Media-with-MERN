const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Profile = require("../../models/Profile");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const User = require("../../models/User");

//@route POST api/profile
//@desc CREATE profile
//@access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileData = {};
    profileData.social = {};
    profileData.user = req.user.id;

    if (req.body.handle) profileData.handle = req.body.handle;
    if (req.body.status) profileData.status = req.body.status;
    if (req.body.eduyear) profileData.eduyear = req.body.eduyear;
    if (req.body.edusemester) profileData.edusemester = req.body.edusemester;
    if (req.body.skills) profileData.skills = req.body.skills;
    if (req.body.bio) profileData.bio = req.body.bio;
    if (req.body.githubusername)
      profileData.githubusername = req.body.githubusername;

    if (typeof req.body.skills !== "undefined")
      profileData.skills = req.body.skills.split(",");

    if (req.body.facebook) profileData.social.facebook = req.body.facebook;
    if (req.body.instagram) profileData.social.instagram = req.body.instagram;
    if (req.body.youtube) profileData.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileData.social.linkedin = req.body.linkedin;

    Profile.findOne({
      user: profileData.user,
    })
      .then((profile) => {
        if (!profile) {
          Profile.findOne({ handle: req.body.handle }).then((profile) => {
            if (profile) {
              errors.handle="Profile handle already exists";
              return res.status(400).json(errors.handle);
            }
            new Profile(profileData).save().then((profile) => {
              res.json(profile);
            });
          });
        } else {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { handle: null },
            { new: true, useFindAndModify: false }
          ).then((profile) => {
            Profile.findOne({ handle: req.body.handle }).then((profile) => {
              if (profile) {
                errors.handle = "Profile handle already exists";
                return res.status(400).json(errors);
              } else {
                profileData.handle = req.body.handle;
                Profile.findOneAndUpdate(
                  { user: req.user.id },
                  { $set: profileData },
                  { new: true, useFindAndModify: false }
                ).then((profile) => {
                  res.json(profile);
                });
              }
            });
          });
        }
      })
      .catch((err) => res.status(404).error());
  }
);

//@route GET api/profile
//@desc GET current Profile
//@access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "displayPicture"])
      .then((profile) => {
        if (profile) {
          res.json(profile);
        } else {
          res.status(404).json("Profile not found");
        }
      })
      .catch((err) => res.status(404).error());
  }
);

//@route GET api/profile/handle/:handle
//@desc GET Profile by handle
//@access public
router.get("/handle/:handle", (req, res) => {
  errors = {};
  Profile.findOne({
    handle: req.params.handle,
  })
  
  .populate("user", ["name", "displayPicture"])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = "No profile found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json({ noProfile: "No profile found" }));
});

//@route GET api/profile/id/:id
//@desc GET Profile by id
//@access public
router.get("/id/:id", (req, res) => {
  errors = {};
  Profile.findOne({
    user: req.params.id,
  })
    .then((profile) => {
      if (!profile) {
        errors.noProfile = "No profile found";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => res.status(404).json({ noProfile: "No profile found" }));
});

//@route GET api/profile/all
//@desc GET all profile
//@access public
router.get("/all", (req, res) => {
  errors = {};
  Profile.find()
    .populate("user", ["name", "displayPicture"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprfiles = "No profiles here";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => res.status(404).json({ noProfile: "No profiles found" }));
});

//@route POST api/profile/experience
//@desc ADD experience to profile
//@access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        const exp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
          current: req.body.current
        };

        profile.experience.unshift(exp);

        new Profile(profile).save().then((profile) => {
          res.json(profile);
        });
      })
      .catch((err) => res.status(400).json(err));
  }
);

//@route POST api/profile/education
//@desc ADD education to profile
//@access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({
      user: req.user.id,
    })
      .then((profile) => {
        const edu = {
          school: req.body.school,
          degree: req.body.degree,
          subject: req.body.subject,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        profile.education.unshift(edu);

        new Profile(profile).save().then((profile) => {
          res.json(profile);
        });
      })
      .catch((err) => res.status(400).json(err));
  }
);

//@route DELETE api/profile/education/:edu_id
//@desc DELETE education
//@access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);
      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);

//@route DELETE api/profile/experience/:exp_id
//@desc DELETE education
//@access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex, 1);

      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);

//@route DELETE /
//@desc DELETE USER
//@access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ succes: "Successfully Removed" });
      });
    });
  }
);

module.exports = router;
