import React from "react";
import { CopyrightOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        <CopyrightOutlined /> Youtube Clone Study
      </p>
    </div>
  );
}

export default Footer;
