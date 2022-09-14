import React, { useState, useEffect } from "react";
import Axios from "axios";
import Post from "../mypost/Post";
function Addpost() {
  const [dbmyposts, setDbMyPost] = useState([]);

  useEffect(() => {
    mypostData();
  }, []);
  function mypostData() {
    var token = localStorage.getItem("token");
    var getmypost = Axios.get("http://localhost:5000/allpost", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    getmypost
      .then((data) => {
        // console.log("Add post", data.data.data);
        let dbPost = data?.data?.data;
        setDbMyPost(dbPost);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const allItem = dbmyposts?.map((dbmypost, index) => (
    <Post
      key={index}
      dbMypost={dbmypost}
      mypostdata={mypostData}
      delete={false}
    />
  ));
  return (
    <>
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-body">
            <div className="container mb-3">
              <div className="container mb-3" style={{ width: "auto" }}>
                <h1>All Post</h1>
                <div>{allItem}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addpost;
