import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/system';
import { Avatar, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pt: 1,
  // ml:4,
  // mr:4
};

export default function CommentModel({ setOpenCommentBox, status, postObj }) {

  const [addComment, setAddComment] = useState('');
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  const handleClose = () => setOpenCommentBox(false);

  useEffect(() => {
    console.log("status :- ", status);
    if (status === true) {
      getAllComments()
    }
  }, [status])

  const getAllComments = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const allComments = fetch(`http://localhost:5000/comments/${postObj?.postId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(res => res.json()).then(res => console.log("res :- ", res)).catch(err => console.log(err))

    // const allComments = axios.get(`http://localhost:5000/comment/${postObj?.postId}`,{
    //   headers: {
    //     Authorization: "Bearer " + token,
    // }
    // }).then(res => console.log("res :- ", res)).catch(err => console.log(err))

  }

  const handleComments = () => {
    if (addComment) {

      // fetch('http://localhost:5000/mypost/comment',{
      //   method: "POST",
      //   headers: {
      //     Authorization: "Bearer " + token
      //   },
      //   body: JSON.stringify({ PostId:postObj })
      // }).then(res => res.json())
      // .then(res => console.log("res ========>>>>>>>>>>> ",res))
      // .catch(err => console.log(err))

      setComments(comments => [...comments, addComment])

      var likePost = axios.post(
        "http://localhost:5000/mypost/comment",
        {
          id: postObj?.postId,
          newComment: addComment
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then(res => {
          toast.info(res?.data?.message);
          setAddComment('');
        })
        .catch(err => toast.error(err));
    }
  }

  const displayComments = comments?.map((data, map) => (
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>{data}</Typography>
  ))

  return (
    <Container>
      <div>
        <Modal
          open={status}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 400 }} className="mt-0" >

            <div className='d-flex align-items-center'>
              <Avatar alt="Remy Sharp" src={`http://localhost:5000/${postObj?.profile_img}`} />
              <div className='flex-col'>
                <h6 className='pl-3 m-0'>{postObj?.username}</h6>
                <p className='pl-3 m-0' style={{ fontSize: '12px' }} >{postObj?.img_title}</p>
              </div>
            </div>

            <hr className='mt-2' />

            <Typography id="modal-modal-title" variant="h6" component="h2">{postObj?.post_caption}</Typography>

            <div>
              {displayComments}

            </div>

            <div className='Add_Comment d-flex'>
              <Input className='inputField' placeholder='Enter Comment' onChange={(e) => setAddComment(e.target.value)} value={addComment} />
              <Button variant="primary" onClick={handleComments}><SendIcon /></Button>
            </div>

          </Box>
        </Modal>
      </div>
    </Container>
  );
}
