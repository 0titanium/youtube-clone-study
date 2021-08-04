import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../../_actions/user_action";
import { Input } from "antd";
import { Button } from "antd";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login"); // withRouter 필요
      } else {
        alert("Failed to Sign Up");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "70vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <Input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <Input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <Input.Password value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <Input.Password
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <Button htmlType="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
