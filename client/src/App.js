import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/views/NavBar/NavBar";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import UploadVideoPage from "./components/views/UploadVideoPage/UploadVideoPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./components/views/SubscriptionPage/SubscriptionPage";
import MyPage from "./components/views/MyPage/MyPage";
import Footer from "./components/views/Footer/Footer";
import Auth from "./hoc/auth";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, true)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
