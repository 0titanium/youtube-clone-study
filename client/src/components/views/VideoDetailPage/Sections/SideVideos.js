import React, { useState, useEffect } from "react";
import Axios from "axios";
import { VIDEO_SERVER } from "../../../../Config";

function SideVideos() {
  const [SideVideos, setSideVideos] = useState([]);

  const fetchSideVideos = () => {
    Axios.get(`${VIDEO_SERVER}/getVideos`).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setSideVideos(response.data.videos);
      } else {
        alert("사이드 비디오를 불러오는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    fetchSideVideos();
  }, []);

  const sideVideoItems = SideVideos.reverse().map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: "flex", marginTop: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>

        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}{" "}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div style={{ marginTop: "3rem" }}></div>
      {SideVideos.length !== 0 && sideVideoItems}
    </div>
  );
}

export default SideVideos;
