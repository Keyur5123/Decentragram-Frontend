import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Search from '../NewChatComponents/Search';
import User from '../NewChatComponents/User';
import io from "socket.io-client";
import ChatBox from '../NewChatComponents/ChatBox/ChatBox';
import ChatBoxDefault from './ChatBox/ChatBoxDefault';
import "../chat.css"

function NewChat(props) {

    const token = localStorage.getItem("token");
    const [allUsers, setAllUsers] = useState([]);
    const [loginUser, setLoginUser] = useState();
    const [receiverUsers, setReceiverUsers] = useState();
    const [searchUser, setSearchUser] = useState();
    const [allActiveUsers, setAllActiveUsers] = useState()

    var socket = io();

    useEffect(() => {
        getAllUsers()
    },[])

    const getAllUsers = async () => {
        await fetch('http://localhost:5000/allUser', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(res => {
                let withoutLoginUsers = res?.data?.filter((user) => user._id !== res.loginUserId)
                setAllUsers(withoutLoginUsers)

                let LoginUser = res?.data?.filter((user) => user._id === res.loginUserId)
                setLoginUser(LoginUser?.[0])
            })
            .catch(err => toast.error("Something went wrong " + err))
    }

    const selectUser = (data) => {
        setReceiverUsers(data)
    }

    const searchedUser = (data) => {
        setSearchUser(data)
    }

    const allUsersList = (searchUser != null ? searchUser : allUsers)?.map((user, index) => (
        <User
            key={index}
            curr_user={user}
            selectUser={selectUser}
            activeUser={allActiveUsers}
        />
    ))

    useEffect(() => {
        socket = io("localhost:5000"); // "ws://localhost:5000"
        
    }, [])

    useEffect(() => {
        setTimeout(()=> {
            console.warn("loginUser :- ",loginUser)
            socket.emit("addUser", loginUser?._id) 
            socket.on("getUser", (users) => setAllActiveUsers(users))
        },3000)
        
    },[])

    const sendMessage = (message) => {
        console.warn("Send Message from Chat.js :- ",message)
        socket.emit("sendMessage", message)
        socket.on("receivMessage",(T) => console.warn("text :- ",T))
    }

    return (
        <div>
            <Container>
                <h2 className='text-center'>CHAT</h2>
                <Row>
                    <Col xs={12} md={4}>
                        <Search users={allUsers} searchedUser={searchedUser} />
                        {allUsersList}
                    </Col>
                    <Col xs={12} md={8}>
                            {receiverUsers ?
                                <ChatBox
                                    users={allUsers}
                                    loginUsers={loginUser}
                                    receverUsers={receiverUsers}
                                    sendMessage={sendMessage}
                                />
                                :
                                <ChatBoxDefault />
                            }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NewChat;