import React, { useState, useEffect } from "react";
import { VIDEO_SERVER } from "../../../../Config";
import Axios from "axios";
import DeleteVideo from "./DeleteVideo";
import { Col, Avatar, Card } from "antd";
import moment from "moment";

function ShowUploads(props) {
  const { Meta } = Card;
//   const [Videos, setVideos] = useState([]);
//   const userId = props.userId;
//   const userInfo = {
//     userId: userId,
//   };

//   const fetchMyVideos = (userInfo) => {
//     Axios.post(`${VIDEO_SERVER}/getMyVideos`, userInfo).then((response) => {
//       if (response.data.success) {
//         console.log(response.data);
//         setVideos(response.data.videos);
//         props.refreshFunc(response.data.videos);
//       } else {
//         alert("비디오를 가져오는데 실패했습니다.");
//       }
//     });
//   };

//   console.log(Videos.length);

//   useEffect(() => {
//     if (userId) {
//       fetchMyVideos(userInfo);
//     }
//   }, []);

  const renderCards = props.VideoLists.reverse().map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col key={video._id} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className="duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span> {video.writer.name} </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views}</span>
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        <DeleteVideo videoId={video._id} refreshFunc={props.refreshFunc} />
      </Col>
    );
  });

  return <React.Fragment>{props.VideoLists.length !== 0 && renderCards}</React.Fragment>;
}

export default ShowUploads;
