import React, { useState, useEffect } from "react";
import Axios from "axios";
import Post from "../mypost/Post";
import { Container } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
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
        if(data?.data?.data){
          let dbPost = data?.data?.data;
          setDbMyPost(dbPost);
        }
        else{
          toast.error(data?.data?.message ?? "Couldn't load data from the server")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const allItem = dbmyposts?.map((dbmypost, index) => (
    <Col xs={12} md={4} lg={3}>
      <Post
        key={index}
        dbMypost={dbmypost}
        mypostdata={mypostData}
        delete={false}
      />
    </Col>
  ));
  return (
    <>
      <h1 className="mt-4 text-center mb-3">All Post</h1>
      <div>
        <Container>
          <Row>
            {allItem}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Addpost;
