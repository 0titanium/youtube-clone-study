const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");
const { SubScriber } = require("../models/Subscriber");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

let upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
  // 비디오를 서버에 저장
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  // 비디오 정보 가져오기

  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    // console.dir(metadata);
    // console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");

      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

// 비디오 업로드

router.post("/uploadVideo", (req, res) => {
  // 비디오 정보를 저장한다.

  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

// 비디오 보내기

router.get("/getVideos", (req, res) => {
  // db에서 비디오 가져오기

  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideoDetail", (req, res) => {
  // db에서 비디오 가져오기

  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, videoDetail });
    });
});

// 구독한 사람의 영상 가져오기

router.post("/getSubscriptionVideos", (req, res) => {
  // 아이디로 구독한 사람의 정보를 가져오기

  SubScriber.find({
    userFrom: req.body.userFrom,
  }).exec((err, subs) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    let subscribingUser = [];

    subs.map((subscribe, i) => {
      subscribingUser.push(subscribe.userTo);
    });

    // 구독한 사람의 비디오를 가져오기

    Video.find({ writer: { $in: subscribingUser } })
      .populate("writer")
      .exec((err, videos) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({ success: true, videos });
      });
  });
});

module.exports = router;
