const express = require("express");
const router = express.Router();
const { SubScriber } = require("../models/Subscriber");

// 구독자 수 보내기
router.post("/subscriberNumber", (req, res) => {
  SubScriber.find({ uesrTo: req.body.uesrTo }).exec((err, subscribe) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res
      .status(200)
      .json({ success: true, subscriberNumber: subscribe.length });
  });
});

// 구독 정보(했는지 안했는지) 보내기
router.post("/subscribed", (req, res) => {
  SubScriber.find({
    uesrTo: req.body.uesrTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    let result = false;

    if (subscribe.length !== 0) {
      result = true;
    }

    return res.status(200).json({ success: true, subscribed: result });
  });
});

// 구독 처리
router.post("/subscribe", (req, res) => {
  const subscribe = new SubScriber(req.body);

  subscribe.save((err, subs) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

// 구독 취소 처리
router.post("/unSubscribe", (req, res) => {
  SubScriber.findOneAndDelete({
    uesrTo: req.body.uesrTo,
    userFrom: req.body.userFrom,
  }).exec((err, subs) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, subs });
  });
});

module.exports = router;
