import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import Axios from "axios";
import Search from "./chatComponents/Search";
import User from "./chatComponents/User";
import io from "socket.io-client";
import ChatBox from "./chatComponents/chatBox/ChatBox";
import ChatBoxDefault from "./chatComponents/chatBox/ChatBoxDefault";
const ENDPOINT = "localhost:5000";

export default function Chat() {
  const token = localStorage.getItem("token");
  const [loginUsers, setLoginUsers] = useState();
  const [receverUsers, setReceverUsers] = useState(null);
  const [recevMessage, setRecevMessage] = useState([]);
  const [users, setUsers] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);
  const [sIoMsgData, setSIoMsgData] = useState(null);
  const socket = useRef();

  useEffect(() => {
    allUser();
  }, []);

  function allUser() {
    let datdda = Axios.get("http://localhost:5000/allUser", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    datdda
      .then((result) => {
        let data = result.data.data;
        let loginUserId = result.data.loginUserId;
        let withoutLoginUsers = data?.filter((user) => {
          return loginUserId !== user._id;
        });
        let LoginUser = data?.filter((user) => {
          return loginUserId === user._id;
        });
        setLoginUsers(LoginUser?.[0]);
        // console.log('[chat.js]withoutLoginUsers',withoutLoginUsers);
        setUsers(withoutLoginUsers);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  function selectUser(data) {
    setReceverUsers(data);
  }


  useEffect(() => {
    socket.current = io(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", loginUsers?._id);
    socket.current.on("getUser", (user) => {
      setActiveUsers(user);
    });
  }, [loginUsers]);

  function sendMessage(data) {
    socket.current.emit("sendMessage", data);
  }

  useEffect(() => {
    // console.log("[chat.ja,socket-data]recevMessage-data", sIoMsgData);
    if (sIoMsgData) {
      setRecevMessage(sIoMsgData)
    }
  }, [sIoMsgData]);

  useEffect(() => {
    socket.current.on("recevMessage", async (data) => {
      setSIoMsgData(data)
      // console.log('data',data);
      // http://localhost:5000/allUser/message  post
      const message = Axios.post(
        "http://localhost:5000/allUser/message",
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        }
        , (err, result) => {
          if (result) {
            console.log("[chat.ja,socket-data]recevMessage_POST", result);
          }
          if (err) {
            console.log("[chat.ja,socket-data]recevMessage error", err);
            // toast.error(data.data.message);
          }
        });
      message
        .then((data) => {
          if (data) {
            // console.log("[chat.ja,socket-data]recevMessage_POST", data);
          }
        })
        .catch((err) => {
          if (err) {
            console.log("[chat.ja,socket-data]recevMessage error", err);
            // toast.error(data.data.message);
          }
        });

    });
  }, [])
  function searchUser(searchUserObj) {
    setSearchUsers(searchUserObj)
  }

  const userSelect = (searchUsers === null ? users : searchUsers)?.map((user, index) => {
    return (
      <User
        key={index}
        user={user}
        selectUser={selectUser}
        activeUsers={activeUsers}
      />
    );
  });

  return (
    <>
      <div>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="container">
          {/* <!-- Page header start --> */}
          <div className="page-title">
            <div className="row gutters">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <h5 className="title">Chat App</h5>
              </div>
              {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                "fefefefsrfzsf "
              </div> */}
            </div>
          </div>
          {/* <!-- Page header end --> */}

          {/* <!-- Content wrapper start --> */}
          <div className="content-wrapper">
            {/* <!-- Row start --> */}
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card m-0">
                  {/* <!-- Row start --> */}
                  <div className="row no-gutters">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                      <div className="users-container">
                        {/* {console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<",loginUsers.userName)} */}
                        {/* <h3>{loginUsers.userName}</h3> */}
                        <Search users={users} searchUser={searchUser} />
                        <ul className="users">
                          {/* <User /> */}
                          {userSelect}
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
                      {/* {console.log('render s56565[chat.ja]',recevMessage, receverUsers)} */}
                      {receverUsers ? (
                        <>
                          <ChatBox
                            users={users}
                            receverUsers={receverUsers}
                            loginUsers={loginUsers}
                            sendMessage={sendMessage}
                            receverMessageObj={recevMessage}

                          /></>
                      ) : (
                        <ChatBoxDefault />
                      )}
                    </div>
                  </div>
                  {/* <!-- Row end --> */}
                </div>
              </div>
            </div>
            {/* <!-- Row end --> */}
          </div>
          {/* <!-- Content wrapper end --> */}
        </div>
      </div>
    </>
  );
}
