import React, { useState, useEffect } from "react";
import Axios from "axios";
import { SUBS_SERVER } from "../../../../Config";

function Subscriber(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  const isLogin = props.isLogin;

  const [SubscriberNumber, setSubscriberNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  // const isLogin =

  // 구독자 수 가져오기
  const fetchSubsNum = (subscribeNumberVariables) => {
    Axios.post(
      `${SUBS_SERVER}/subscriberNumber`,
      subscribeNumberVariables
    ).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setSubscriberNumber(response.data.subscriberNumber);
      } else {
        alert("구독자 수를 가져오는데 실패했습니다.");
      }
    });
  };

  // 구독 정보(했는지 안했는지) 가져오기

  const fetchSubscribed = (subscribeNumberVariables) => {
    Axios.post(`${SUBS_SERVER}/subscribed`, subscribeNumberVariables).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setSubscribed(response.data.subscribed);
        } else {
          alert("구독 정보를 가져오는데 실패했습니다.");
        }
      }
    );
  };

  // 구독하기
  const fetchSubscribe = (subscribeVariables) => {
    Axios.post(`${SUBS_SERVER}/subscribe`, subscribeVariables).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setSubscriberNumber(SubscriberNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독에 실패했습니다.");
        }
      }
    );
  };

  // 구독 취소하기
  const fetchUnSubscribe = (subscribeVariables) => {
    Axios.post(`${SUBS_SERVER}/unSubscribe`, subscribeVariables).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setSubscriberNumber(SubscriberNumber - 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독 취소하는데 실패했습니다.");
        }
      }
    );
  };

  useEffect(() => {
    let subscribeNumberVariables = { userTo: userTo, userFrom: userFrom };
    fetchSubsNum(subscribeNumberVariables);
    if (isLogin) {
      fetchSubscribed(subscribeNumberVariables);
    }
  }, []);

  const onSubscribe = () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (!isLogin) {
      alert("로그인이 필요한 기능입니다.");
    } else {
      if (Subscribed) {
        fetchUnSubscribe(subscribeVariables);
      } else {
        fetchSubscribe(subscribeVariables);
      }
    }
  };

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        {SubscriberNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscriber;
