import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from 'axios';
import { toast } from 'react-toastify';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineTwoToneIcon from '@mui/icons-material/ChatBubbleOutlineTwoTone';

function Post(props) {

    const [likeBtn, setLikeBtn] = useState(false);
    const [postLikeUser, serPostLikeUser] = useState([]);

    var token = localStorage.getItem("token");
    const dbData = props.dbMypost;
    var post_img = dbData?.postImg;
    var profile_img = dbData?.userData?.image;
    var img_title = dbData?.postTitle;
    var post_caption = dbData?.postCaption;
    var postId = dbData?._id;
    var username = dbData?.userData?.userName;

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
                // console.log(data.data.data.postLike);
                let likeUserId = data?.data?.likeUserId;
                let postlikeArr = data?.data?.data?.postLike;

                let dbuserid = postlikeArr.filter((item) => {    // curr user a like karyu 6 k ny e check karse
                    // console.log("fiterId", item.postLikeUserId);
                    return item.postLikeUserId === likeUserId;
                });
                // console.log("get like likseUserData", dbuserid[0]?.like);
                setLikeBtn(dbuserid[0]?.like);

                let postLikeUserdata = postlikeArr.filter((item) => {     // postLikeArray ma new array add thase wether user unliked post after liked
                    return item.like === true;                             // soo..only jeni like value true hase te j count thase and that's how we calculate the total no. of like count
                });
                serPostLikeUser(postLikeUserdata);
                // console.log("countervalu", likeCounter);
            })
            .catch((err) => {
                console.log("error", err);
            });
    }

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
        <div>
            <Card border="light">
                <Card.Header>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex'>
                            <Card.Img className='img-fluid rounded-circle' src={`http://localhost:5000/${profile_img}`} alt="Profile Image" style={{ width: "40px", height: "40px" }} variant="top" />
                            <div className='ml-2 align-items-center'>
                                <h6 className='mb-0' >{username}</h6>
                                <span style={{ fontSize: '14px' }}>{img_title}</span>
                            </div>
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

                <Card.Body className='pt-2'>
                    <div className='d-flex'>
                        <div onClick={likeBtnClicked}>
                            {likeBtn === true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </div>
                        <div>
                            <ChatBubbleOutlineTwoToneIcon style={{ height:"25px", width:"20px" }} />
                        </div>
                        <p className='ml-2 mb-0'>{post_caption}</p>
                    </div>

                    <div>
                        <p className='mb-0'>{postLikeUser.length === 0 ? null : `${postLikeUser.length} likes`}</p>
                    </div>
                </Card.Body>
            </Card>
        </div >
    );
}

export default Post;