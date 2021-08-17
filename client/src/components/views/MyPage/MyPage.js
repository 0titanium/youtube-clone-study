import React, { useState, useEffect } from "react";
import { getCookie } from "../../../utils/getCookie";
import { Typography, Row } from "antd";
import ShowUploads from "./Sections/ShowUploads";

function MyPage() {
  const { Title } = Typography;
  const userId = getCookie("user_id", document.cookie);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>My Uploads</Title>
      <hr />
      <Row gutter={(32, 16)}>
        <ShowUploads userId={userId} />
      </Row>
    </div>
  );
}

export default MyPage;
