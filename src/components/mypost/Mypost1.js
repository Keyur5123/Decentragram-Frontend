import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Axios from "axios";
import { toast } from 'react-toastify';
import Post1 from './Post1';

function MyPost1(props) {


    const [myPostImg, setMyPostImg] = useState()
    const [postTitle, setPostTitle] = useState()
    const [myAllPosts, setMyAllPosts] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem("token");

        let formdata = new FormData();
        formdata.append("image", myPostImg);
        formdata.append("mptitle", postTitle);

        await Axios.post("http://localhost:5000/mypost/", formdata, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then(res => {
                toast.info(res.data.message);
                getMyAllPostData();
            })
            .catch(err => toast.error(err))
    }

    const getMyAllPostData = async () => {
        const token = localStorage.getItem("token");
        await Axios.get("http://localhost:5000/mypost/", {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
            .then(res => setMyAllPosts(res.data.data))
            .catch(err => toast.error(err))
    }

    useEffect(() => {
        getMyAllPostData()
    }, [])

    const displayMyAllPosts = myAllPosts?.map((dbmypost, index) => (
        <Col xs={12} md={4} lg={3}>
            <Post1
                key={index}
                dbMypost={dbmypost}
                mypostdata={getMyAllPostData}
                delete={true}
            />
        </Col>
    ))

    return (
        <>
            <Container>
                <div>
                    <h1 className='text-center'>Add Post</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Choose photo to be upload</Form.Label>
                            <Form.Control type="file" placeholder='' onChange={e => setMyPostImg(e.target.files[0])} required />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Enter Post Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" onChange={e => setPostTitle(e.target.value)} required />
                        </Form.Group>
                        <Button className='mt-3' variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className='mt-3'>
                    <Row>
                        {displayMyAllPosts}
                    </Row>
                </div>

            </Container>
        </>
    );
}

export default MyPost1;