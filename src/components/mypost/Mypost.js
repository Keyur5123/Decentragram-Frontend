import React, { useState, useEffect } from "react";
import Post from "./Post";
import Axios from "axios";
import { toast } from "react-toastify";
function Mypost() {
  const [mypostimg, setMypostImg] = useState();
  const [posttitle, setPostTitle] = useState();
  const [dbmyposts, setDbMyPost] = useState([]);

  useEffect(() => {
    mypostData();
  }, []);

  function mypostData() {
    
    var token = localStorage.getItem("token");
    var getmypost = Axios.get("http://localhost:5000/mypost/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    getmypost
      .then((data) => {
        console.log("postData", data.data.data);
        let dbPost = data.data.data;
        setDbMyPost(dbPost);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlerImage = (e) => {
    console.log("<<<<<>>>>>>>>>",e.target.files);
    setMypostImg(e.target.files[0]);
  };

  const handlerChange = (e) => {
    // console.log(e.target.value);
    setPostTitle(e.target.value);
  };
  
  const handlersubmitimg = async (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("image", mypostimg);
    formdata.append("mptitle", posttitle);
    var token = localStorage.getItem("token");
    // console.log("ckdmvlkndfvjk fdkvmd");

    const mypost = Axios.post("http://localhost:5000/mypost/", formdata, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    mypost
      .then((data) => {
        if (data) {
          toast.info(data.data.message);
          // console.log(data.data.message);
          // console.log(data.data);
          // setMypostImg("");
          setPostTitle("");
          mypostData();
        }
      })
      .catch((err) => {
        if (err) {
          console.log("err from mypost", err);
          // toast.error(data.data.message);
        }
      });
  };
  // console.log("post id from mypoodt", postImgId );
  // console.log("post id from mypoodt", dbmyposts );
  const postIten = dbmyposts?.map((dbmypost, index) => (
    <Post
      key={index}
      dbMypost={dbmypost}
      mypostdata={mypostData}
      delete={true}
    />
  ));

  return (
    <>
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-body">
            <div className="container mb-3">
              <br />
              <h1>Add Post</h1>
              <form
                className="profile"
                onSubmit={(e) => {
                  handlersubmitimg(e);
                }}
              >
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput"
                    name="image"
                    // value={mypostimg}
                    placeholder="image"
                    onChange={(e) => {
                      handlerImage(e);
                    }}
                  />
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={posttitle}
                    name="title"
                    placeholder="titles"
                    onChange={(e) => {
                      handlerChange(e);
                    }}
                  />
                </div>

                <div className="form-floating mb-3">
                  <button type="submit" className="btn btn-primary">
                    submit
                  </button>
                </div>

              </form>

              <div className="container mb-3" style={{ width: "auto" }}>
                <h1>My Post</h1>
                <div>
                  {/* {console.log("ddd", postIten)} */}
                  {postIten}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypost;
