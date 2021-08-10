import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";
import { VIDEO_SERVER } from "../../../Config";
import { getCookie } from "../../../getCookie/getCookie";

function UploadVideoPage(props) {
  const userId = getCookie("user_id", document.cookie);
  const { Title } = Typography;
  const { TextArea } = Input;
  const PrivateOption = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];
  const CategoryOption = [
    { value: 0, label: "Music" },
    { value: 1, label: "Film" },
    { value: 2, label: "Animation" },
    { value: 3, label: "Sports" },
    { value: 4, label: "Cooking" },
  ];

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState(0);
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const onTitleChange = (event) => {
    setVideoTitle(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.currentTarget.value);
  };

  const onPrivacyChange = (event) => {
    setPrivate(event.currentTarget.value);
  };

  const onCategoryChange = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onDropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    Axios.post(`${VIDEO_SERVER}/uploadfiles`, formData, config).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);

          let variables = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          };

          setFilePath(response.data.filePath);

          Axios.post(`${VIDEO_SERVER}/thumbnail`, variables).then(
            (response) => {
              if (response.data.success) {
                console.log(response.data);
                setDuration(response.data.fileDuration);
                setThumbnail(response.data.thumbsFilePath);
                console.log(response.data.thumbsFilePath);
              } else {
                alert("썸네일 생성에 실패했습니다.");
              }
            }
          );
        } else {
          alert("비디오 업로드에 실패했습니다.");
        }
      }
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      writer: userId,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    Axios.post(`${VIDEO_SERVER}/uploadVideo`, variables).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        message.success("비디오가 업로드 되었습니다.");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("비디오 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop zone */}

          <Dropzone
            onDrop={onDropHandler}
            multiple={false}
            maxSize={102400000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem", color: "#54a0ff" }} />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}

          {Thumbnail !== "" && (
            <div>
              <img src={`http://localhost:5000/${Thumbnail}`} alt="thumbnail" />
            </div>
          )}
        </div>

        <br />
        <br />

        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />

        <br />
        <br />

        <label>Description</label>

        <TextArea onChange={onDescriptionChange} value={Description} />

        <br />
        <br />

        <select onChange={onPrivacyChange}>
          {PrivateOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
