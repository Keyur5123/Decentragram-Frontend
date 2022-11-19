import axios from "axios";
import React, { useEffect, useState } from "react";
import SenderText from "../SenderText";
import ReceverText from "../ReceverText";
import { toast } from 'react-toastify';

export default function ChatBox(props) {

  const token = localStorage.getItem("token");
  const receverMessageObj = props.receverUsers;
  const [inputText, setInputText] = useState("");
  var receverUsers = props.receverUsers;
  var loginUsers = props.loginUsers;
  
  const [texts, setText] = useState({});
  const [textsIO, setTextIO] = useState([]);
  const [textObjIOhtml, setTextObjIOhtml] = useState();
  
  // console.log("receverMessageObj :- ",textsIO);
  // useEffect(() => {
  //   if (receverMessageObj) {
  //     setTextIO(textsIO => [...textsIO, receverMessageObj])
  //   }
  // }, [receverMessageObj])

  console.warn("receverUsers User :- ",receverUsers);
  useEffect(() => {
    try {

      
      var textObjIO = textsIO?.map((text, index) => {
        // console.warn("textsIO User :- ",textsIO);
        if (loginUsers?._id === text?.senderId && receverUsers?._id === text?.receverId) {
          return <SenderText key={index} SenderText={text} senderData={loginUsers} />
        }
        if (loginUsers?._id === text.receverId && receverUsers?._id === text?.senderId) {
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
    axios.get("http://localhost:5000/allUser/message ", {
      headers: {
        Authorization:
          "Bearer " + token + " " + loginUsers?._id + " " + receverUsers?._id,
      },
    }).then((data) => {
      console.log("GET_MESSAGE_CHAT_BOX", data.data.data);
      setText(data.data.data);
    })
      .catch((err) => {
        console.log("[chatBox.js]", err);
      });
  }

  async function handlerSubmit(e) {
    e.preventDefault();
    const sendObj = {
      senderId: loginUsers?._id,
      receverId: receverUsers?._id,
      Text: inputText,
      Time: Date.now()
    };
    setTextIO(textsIO => [...textsIO, sendObj])
    props.sendMessage(sendObj);

    // await fetch('http://localhost:5000/allUser/message',{
    //   method:"POST",
    //   headers:{
    //     Authorization: "Bearer " + token + " " + loginUsers?._id + " " + receverUsers?._id
    //   },
    //   body: JSON.stringify({ sendObj:sendObj })
    // })
    // .then(res => res.json())
    await axios.post("http://localhost:5000/allUser/message", sendObj, {
      headers: {
        Authorization: "Bearer " + token + " " + loginUsers?._id + " " + receverUsers?._id
      },
    })
      .then((res) => console.log("res :- ", res))
      .catch(err => console.log("error occuer :- ", err))
      setInputText("");
      // document.location.reload();   // textIo object set kari ne send karvama problem ave 6 because one-to-many conversation automatically thay jay 6
  }

  try {

    var textObj = texts?.map((text, index) => {
      if (loginUsers?._id === text.senderId && receverUsers?._id === text.receverId) {
        // console.warn("loginUsers :- ", text.senderId, " receverUsers :- ", text.receverId)
        return <SenderText key={index} SenderText={text} senderData={loginUsers} messageObjsGET={messageObjsGET} />
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
    toast.error(error)
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
                onChange={(e) => setInputText(e.target.value)}
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
