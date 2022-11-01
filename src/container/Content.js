import React from "react";
import Header from "../components/navbar/Header";
import Home from "../components/home/Home"
import Mypost from "../components/mypost/Mypost";
import Profile from "../components/profile/Profile";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import NF from "../components/notfountpage/Notfountpage";
import Chat from "../components/chat/NewChatComponents/Chat";
// import Chat from "../components/chat/Chat"
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Route, Switch } from "react-router-dom";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommentModel from "../components/mypost/CommentModel";

function Content() {
  const lToken = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {lToken ? (
            <>
              <Route path="/" exact element={<Home />} />
              <Route path="/Chat" exact element={<Chat />} />
              <Route path="/MyPost" exact element={<Mypost />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/comment" exact element={<CommentModel />} />
              <Route path="/*" element={<NF />} />
              <Route path="/Chat/*" element={<NF />} />
              <Route path="/MyPost/*" element={<NF />} />
              <Route path="/profile/*" element={<NF />} />
              <Route path="/logout/*" element={<NF />} />
            </>
          ) : (
            <>
              <Route path="/" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/register/*" element={<NF />} />
              {/* <Route path="/*" element={<NF} /> */}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Content;
