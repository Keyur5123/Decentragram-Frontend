import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from 'axios';
import { toast } from 'react-toastify';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Post1(props) {

    var token = localStorage.getItem("token");
    const dbData = props.dbMypost;
    var post_img = dbData.postImg;
    var profile_img = dbData.userData.image;
    var img_title = dbData.postTitle;


    const deletePost = (e) => {
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

    return (
        <div>
            <Card>
                <Card.Header>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex'>
                            <Card.Img className='img-fluid rounded-circle' src={`http://localhost:5000/${profile_img}`} alt="Profile Image" style={{ width: "40px", height: "40px" }} variant="top" />
                            <Card.Text className='d-flex align-items-center ml-2' >{dbData.userData.userName}</Card.Text>
                        </div>
                        <div>
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
                    </div>
                </Card.Header>

                <Card.Img variant="top" src={`http://localhost:5000/${post_img}`} alt="postimage" />

                <Card.Body>
                    <div className='d-flex'>
                        <FavoriteIcon />
                        <Card.Title>{img_title}</Card.Title>
                    </div>
                </Card.Body>
            </Card>
        </div >
    );
}

export default Post1;