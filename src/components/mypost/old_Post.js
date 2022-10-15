import React, { useState, useEffect } from "react";
import Axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import "./post.css";
import { toast } from "react-toastify";

function Post(props) {
  var token = localStorage.getItem("token");
  const dbData = props.dbMypost;
  // console.log("post data", dbData);
  // const [dbData, setDbData] = useState(props.dbMypost);
  const [likeBtn, setLikeBtn] = useState(false);
  const [postLikeUser, serPostLikeUser] = useState([]);
  // console.log("postlikeusrdata", postLikeUser);
  var img = dbData.postImg;

  if (dbData.postTitle) {
    var title = "";
  } else {
    title = dbData.postTitle;
  }
  var postId = dbData._id;
  var peofileimg = dbData.userData.image;
  var username = dbData.userData.userName;

  useEffect(() => {
    getLikeBtnData();
  }, []);

  function getLikeBtnData() {
    Axios.get(`http://localhost:5000/mypost/likePost?postid=${postId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((data) => {
        // console.log(data.data.likeUserId);
        // console.log(data.data.data.postLike);
        let likeUserId = data.data.likeUserId;
        let postlikeArr = data.data.data.postLike;
        let dbuserid = postlikeArr.filter(function (item) {
          // console.log("fiterId", item.postLikeUserId);
          return item.postLikeUserId === likeUserId;
        });
        // console.log("get like likseUserData", dbuserid[0]?.like);
        setLikeBtn(dbuserid[0]?.like);
        // console.log("postlikeArr", postlikeArr);
        let postLikeUserdata = postlikeArr.filter((item) => {
          return item.like === true;
        });
        serPostLikeUser(postLikeUserdata);
        // console.log("countervalu", likeCounter);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  
  var deletePost = (e) => {
    e.preventDefault();
    var postId = dbData._id;
    var deletePost = Axios.post("http://localhost:5000/mypost/delete", {
      id: postId,
    });
    deletePost
      .then((data) => {
        // console.log(data);
        toast.info(data.data.message);
        props.mypostdata();
      })
      .catch((err) => {
        toast.error(err);
        console.log("error", err);
      });
  };
  // console.log("likeBtn", likeBtn);
  const likeBtnClicked = () => {
    var likeValue = !likeBtn;
    // console.log("cliked====>", likeValue);
    var likePost = Axios.post(
      "http://localhost:5000/mypost/likePost",
      {
        id: postId,
        like: likeValue,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    likePost
      .then((data) => {
        // console.log(data.data);
        getLikeBtnData();
        // toast.error(data.data.message);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <div className="card " style={{ width: "300px" }}>
        <div className="modal-header" style={{ justifyContent: "inherit" }}>
          <img
            style={{ width: "40px", height: "40px" }}
            src={`http://localhost:5000/${peofileimg}`}
            className="card-img-top rounded-circle mr-3 "
            alt="profileimage"
          />
          <h6 className="modal-title">{username}</h6>
          {props.delete === true ? (
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
                <div className="dropdown-item" onClick={(e) => deletePost(e)}>
                  Delete <DeleteIcon />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <img
          style={{ borderBlockColor: "20px" }}
          src={`http://localhost:5000/${img}`}
          className="card-img-top"
          alt="postimage"
        />
        <div className="card-body" style={{ margin: "-18px" }}>
          {title}
        </div>
        <div className="card-body" style={{ margin: "-18px" }}>
          <Button
            onClick={() => {
              likeBtnClicked();
            }}
          >
            {likeBtn === true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </Button>
        </div>
        <div className="card-body" style={{ margin: "-18px" }}>
          {postLikeUser.length === 0 ? null : `${postLikeUser.length}likes`}
        </div>
      </div>
    </>
  );
}

export default Post;
