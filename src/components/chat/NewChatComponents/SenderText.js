import React, { useState } from "react";
import axios from "axios";

export default function SenderText(props) {
  const token = localStorage.getItem('token')
  const [unsetButton, setUnsetButton] = useState(false)
  const SenderText = props.SenderText;
  const senderData = props.senderData;
  // console.log("[SenderText.js]SenderText", SenderText);
  // console.log("[SenderText.js]senderData", senderData);
  function handlerMouseOver() {
    setUnsetButton(!unsetButton)
  }
  function unSendMessage() {
    console.log('unsendMessage', SenderText._id)
    axios.post(
      "http://localhost:5000/allUser/unsend",
      { id: SenderText._id }
      ,
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      }
      , (err, result) => {
        if (result) {
          // console.log("[reseveMessage.js]unsend", result);
        }
        if (err) {
          console.log("[chat.ja,socket-data]recevMessage error", err);
          // toast.error(data.data.message);
        }
      });
    props.messageObjsGET()
  }
  return (
    <>
      <li className="chat-right">
        <div className="chat-hour">
        {SenderText.date ? SenderText.date : SenderText.Times} <span className="fa fa-check-circle"></span>
        </div>
        <div className="chat-text displaflex" onMouseEnter={() => handlerMouseOver()} onMouseLeave={() => handlerMouseOver()} >
          {/* Hi, Russell */}

          {SenderText.text ? SenderText.text : SenderText.Text}
          {unsetButton ? <>
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
          </> : null}
        </div>
        <div className="chat-avatar">
          <img
            src={`http://localhost:5000/${senderData.image}`}
            alt="Retail Admin"
          />
          <div className="chat-name">{senderData.userName}</div>
        </div>
      </li>

    </>
  );
}
