const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comments) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    Comment.find({ _id: comments._id })
      .populate("writer")
      .exec((err, id) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }

        res.status(200).json({ success: true, id });
      });
  });
});

router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
