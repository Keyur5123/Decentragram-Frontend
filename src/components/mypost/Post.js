import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CommentModel from './CommentModel';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Axios from "axios";
import Popover from '@mui/material/Popover';
import { toast } from 'react-toastify';
import Heart from "../assets/heart.webp"

function Post(props, { key }) {

  var token = localStorage.getItem("token");
  const dbData = props.dbMypost;
  // var post_img = dbData?.postImg;
  // var profile_img = dbData?.userData?.image;
  // var img_title = dbData?.postTitle;
  // var post_caption = dbData?.postCaption;
  // var postId = dbData?._id;
  // var username = dbData?.userData?.userName;



  const postObj = {
    post_img:dbData?.postImg,
    profile_img:dbData?.userData?.image,
    img_title:dbData?.postTitle,
    post_caption:dbData?.postCaption,
    postId:dbData?._id,
    username:dbData?.userData?.userName
  }

  const [likeBtn, setLikeBtn] = useState(false);
  const [postLikeUser, serPostLikeUser] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCommentBox, setOpenCommentBox] = useState(false)


  useEffect(() => {
    getLikeBtnData();
  }, []);


  function getLikeBtnData() {
    Axios.get(`http://localhost:5000/mypost/likePost?postid=${postObj?.postId}`, {
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


  const likeBtnClicked = () => {
    var likeValue = !likeBtn;
    // console.log("cliked====>", likeValue);
    var likePost = Axios.post(
      "http://localhost:5000/mypost/likePost",
      {
        id: postObj?.postId,
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (

    <Card className="mb-5">
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={`http://localhost:5000/${postObj?.profile_img}`} />
        }
        action={
          <IconButton aria-label="settings">
            {props?.delete ?
              <>
                <MoreVertIcon onClick={handleClick} />
                <Popover
                  id={`${open} ? 'simple-popover' : undefined`}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Typography onClick={(e) => deletePost(e)} sx={{ p: 2 }}>Delete <DeleteIcon /></Typography>
                </Popover>
              </>
              :
              null
            }
          </IconButton>
        }
        title={postObj?.username}
        subheader={postObj?.img_title}
      />

      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:5000/${postObj?.post_img}`}
        alt="Paella dish"
      />

      <CardContent className='pb-0'>
        <Typography variant="body2" color="text.secondary">{postObj?.post_caption}</Typography>
      </CardContent>

      <CardActions disableSpacing>

        <div className='d-flex flex-column'>
          <div className='d-flex'>
            <IconButton onClick={likeBtnClicked} aria-label="add to favorites">
              {/* {likeBtn === true ? <FavoriteIcon /> : <FavoriteBorderIcon />} */}
              {likeBtn === true ? <img src={Heart} alt="icon" height="25px" /> : <FavoriteBorderIcon />}
            </IconButton>

            <div>
              <IconButton onClick={() => setOpenCommentBox(!openCommentBox)} aria-label="comment" >
                <ChatBubbleOutlineIcon />
              </IconButton>

              <CommentModel
                setOpenCommentBox={setOpenCommentBox} 
                status={openCommentBox} 
                postObj={postObj}
              />
            </div>

            <SendRoundedIcon className='mt-2' />

          </div>

          <div className='Post__Likes'>
            <span>{`${postLikeUser.length} likes`}</span>
          </div>

        </div>

      </CardActions>

    </Card>
  );
}

export default Post;