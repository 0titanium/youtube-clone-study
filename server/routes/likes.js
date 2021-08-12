const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

router.post("/getLikes", (req, res) => {
  let variable = {};

  // video like, reply like
  if (req.body.videoId) {
    if (!req.body.userId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    }
  } else {
    if (!req.body.userId) {
      variable = { commentId: req.body.commentId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
  }

  Like.find(variable).exec((err, likes) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, likes });
  });
});

router.post("/getDislikes", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    if (!req.body.userId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    }
  } else {
    if (!req.body.userId) {
      variable = { commentId: req.body.commentId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }
  }

  Dislike.find(variable).exec((err, dislikes) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, dislikes });
  });
});

router.post("/upLike", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const like = new Like(variable);

  // db에 좋아요 정보 저장
  like.save((err, likeResult) => {
    if (err) {
      return res.json({ success: false, err });
    }

    // 싫어요가 눌러져있을 경우 싫어요 하나 삭제
    Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({ success: true });
    });
  });
});

router.post("/unLike", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

router.post("/upDislike", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  const disLike = new Dislike(variable);

  // db에 싫어요 정보를 저장.

  disLike.save((err, dislikeResult) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // 이미 좋아요가 눌러져있을 경우 좋아요 하나 삭제
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true });
    });
  });
});

router.post("/unDislike", (req, res) => {
  let variable = {};

  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

module.exports = router;
