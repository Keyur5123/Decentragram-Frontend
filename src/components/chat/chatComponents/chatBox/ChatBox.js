import axios from "axios";
import React, { useEffect, useState } from "react";
import ReceverText from "../ReceverText";
import SenderText from "../SenderText";

export default function ChatBox(props) {
  
  const token = localStorage.getItem("token");
  const  receverMessageObj = props.receverMessageObj;
  
  
  const [inputText, setInputText] = useState("");
  var receverUsers = props.receverUsers;
  var loginUsers = props.loginUsers;
  console.warn("receverUsers :- ",receverUsers)
  
  const [texts, setText] = useState({});
  const [textsIO, setTextIO] = useState([]);
  const [textObjIOhtml, setTextObjIOhtml] = useState();

// console.log('textIO',textsIO);

useEffect(()=>{
  if(receverMessageObj){
    textsIO.push(receverMessageObj)
    setTextIO([...textsIO])
    // console.log('receverMessageObj',receverMessageObj);
  }

},[receverMessageObj])

  useEffect(() => {
    
    try {

      var textObjIO = textsIO?.map((text, index) => {
        if (loginUsers?._id === text.senderId && receverUsers?._id === text.receverId) {
          return <SenderText key={index} SenderText={text} senderData={loginUsers} />
        }
        if (loginUsers?._id === text.receverId && receverUsers?._id === text.senderId) {
          return <ReceverText
            key={index}
            users={props.users}
            receverMessageObj={text}
          />
        }
      });
      setTextObjIOhtml(textObjIO)
    } catch (error) {
      console.log(error)
    }
  }, [textsIO]);

  useEffect(() => {
    messageObjsGET()
  }, [receverUsers?._id]);

  const messageObjsGET = () => {
    var messagedataGet = axios.get("http://localhost:5000/allUser/message ", {
      headers: {
        Authorization:
          "Bearer " + token + " " + loginUsers?._id + " " + receverUsers?._id,
      },
    });
    messagedataGet
      .then((data) => {
        // console.log("GET_MESSAGE_CHAT_BOX", data.data.data);
        setText(data.data.data);
      })
      .catch((err) => {
        console.log("[chatBox.js]", err);
      });
  }

  async function handlerChange(e) {
    await setInputText(e.target.value);
  }
  async function handlerSubmit(e) {
    e.preventDefault();
    const sendObj = {
      senderId: loginUsers?._id,
      receverId: receverUsers?._id,
      Text: inputText,
      Time:Date.now()
    };
    textsIO.push(sendObj)
    setTextIO([...textsIO])
    await props.sendMessage(sendObj);
    setInputText("");
  }

  try {

    var textObj = texts?.map((text, index) => {
      if (loginUsers?._id === text.senderId && receverUsers?._id === text.receverId) {
        return <SenderText key={index} SenderText={text} senderData={loginUsers}
        messageObjsGET={messageObjsGET} />
      }
      if (loginUsers?._id === text.receverId && receverUsers?._id === text.senderId) {
        return <ReceverText
          key={index}
          users={props.users}
          receverMessageObj={text}
          messageObjsGET={messageObjsGET}
        />
      }
    });
  } catch (error) {
    // console.log(error)
  }
  return (
    <div>
      <div className="selected-user">
        {receverUsers ? (
          <span>
            To:
            <span className="name">{receverUsers?.userName}</span>
          </span>
        ) : null}
      </div>
      <div className="chat-container">
        <ul className="chat-box chatContainerScroll">
          <div className="chatBox">
          {textObj}
          {textObjIOhtml}
          </div>
         
        </ul>
        <div className="form-group mt-3 mb-0">
          <form
            onSubmit={(e) => {
              handlerSubmit(e);
            }}
          >
            <div className="input-group">
              {" "}
              <input
                type="text"
                name="message"
                placeholder="Type Message ..."
                className="form-control"
                onChange={(e) => handlerChange(e)}
                value={inputText}
              />{" "}
              <span className="input-group-btn">
                {" "}
                <button type="submit" className="btn btn-info">
                  Send
                </button>{" "}
              </span>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
