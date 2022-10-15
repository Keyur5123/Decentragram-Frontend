import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReceverText(props) {
  const token = localStorage.getItem('token')
  const [unsetButton, setUnsetButton] = useState(false)
  var users = props.users;
  var receverMessageObj = props.receverMessageObj;

  // console.log("[RecevText.js]receverMessageObj", users);
  
  var senderUser = users.filter((user) => {
    return user._id === receverMessageObj?.senderId;
  });

  // function unSendMessage() {
  //   console.log('unsendMessage', receverMessageObj._id)
  //   axios.post(
  //     "http://localhost:5000/allUser/unsend",
  //     { id: receverMessageObj._id }
  //     ,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       }
  //     }
  //     , (err, result) => {
  //       if (result) {

  //         // console.log("[reseveMessage.js]unsend", result);
  //       }
  //       if (err) {
  //         console.log("[chat.ja,socket-data]recevMessage error", err);
  //         // toast.error(data.data.message);
  //       }
  //     });
  //   props.messageObjsGET()
  // }

  // console.log("[RecevText.js]senderUser", senderUser);
  return (
    <>
      <li className="chat-left">
        <div className="chat-avatar">
          <img
            src={`http://localhost:5000/${senderUser[0]?.image}`}
            alt="Retail Admin"
          />

          <div className="chat-name">{senderUser[0]?.userName}</div>
        </div>
        <div className="chat-text displaflex" onMouseEnter={() => setUnsetButton(!unsetButton)} onMouseLeave={() => setUnsetButton(!unsetButton)}>
          {receverMessageObj?.text ? receverMessageObj?.text : receverMessageObj?.Text}
          {/* {unsetButton ? <>
            <div className="dropdown" style={{ marginLeft: "auto" }}>
              <button
                className="btn  dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="dropdown-item" onClick={(e) => unSendMessage(e)}>
                  Unsend
                </div>
              </div>
            </div>
          </> : null} */}
        </div>
        
        {/* <div className="chat-hour">
          08:55 <span className="fa fa-check-circle"></span>
        </div> */}
      </li>
    </>
  );
}
