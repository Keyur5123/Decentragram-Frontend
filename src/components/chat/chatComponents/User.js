import React from "react";
import "../chat.css";
export default function User(props) {
  const userData = props.user;
  const profileImg = userData.image;
  const userName = userData.userName;
  const activeUser = props.activeUsers?.filter((user) => {
    return user.userId === userData._id;
  });
  return (
    <div
      onClick={() => {
        props.selectUser(userData);
      }}
    >
      <li className="person" data-chat="person1">
        <div className="user">
          <img src={`http://localhost:5000/${profileImg}`} alt="Retail Admin" />
          <span
            className={activeUser?.length === 0 ? null : `status online`}
          ></span>
        </div>
        <p className="name-time">
          <span className="name">{userName}</span>
          {/* <span className="time">15/02/2019</span> */}
        </p>
      </li>
    </div>
  );
}
