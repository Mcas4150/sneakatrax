const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Track = require("../../models/Track");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateTrackInput = require("../../validation/track");

// @route   GET api/albym/test
// @desc    Tests album route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Track Works" }));

// @route   GET api/tracks
// @desc    Get tracks
// @access  Public
router.get("/", (req, res) => {
  Track.find()
    .sort({ date: -1 })
    .then(tracks => res.json(tracks))
    .catch(err => res.status(404).json({ notracksfound: "No tracks found" }));
});

// @route   GET api/tracks/:id
// @desc    Get track by id
// @access  Public
router.get("/:id", (req, res) => {
  Track.findById(req.params.id)
    .then(track => res.json(track))
    .catch(err =>
      res.status(404).json({ notrackfound: "No track found with that ID" })
    );
});

// @route   POST api/tracks
// @desc    Create track
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTrackInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newTrack = new Track({
      title: req.body.title,
      artist: req.body.artist,
      youtube: req.body.youtube,
      discogs: req.body.discogs,
      user: req.user.id,
      name: req.body.name
    });

    newTrack.save().then(track => res.json(track));
  }
);

// @route   DELETE api/tracks/:id
// @desc    Delete track
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Track.findById(req.params.id)
        .then(track => {
          // Check for post owner
          if (track.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          track.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ tracknotfound: "No track found" })
        );
    });
  }
);

// @route   POST api/tracks/like/:id
// @desc    Like track
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Track.findById(req.params.id)
        .then(track => {
          if (
            track.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          track.likes.unshift({ user: req.user.id });

          track.save().then(track => res.json(track));
        })
        .catch(err =>
          res.status(404).json({ tracknotfound: "No track found" })
        );
    });
  }
);

// @route   POST api/tracks/unlike/:id
// @desc    Unlike track
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Track.findById(req.params.id)
        .then(track => {
          if (
            track.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this track" });
          }

          // Get remove index
          const removeIndex = track.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          track.likes.splice(removeIndex, 1);

          // Save
          track.save().then(track => res.json(track));
        })
        .catch(err =>
          res.status(404).json({ tracknotfound: "No track found" })
        );
    });
  }
);

module.exports = router;
