import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Login1(props) {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({ email:'', password:'' })

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginInfo({ ...loginInfo, [name]:value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        // if(!loginInfo.email){
        //     toast.error("email is require");
        // }
        // else if(!loginInfo.password){
        //     toast.error("password is require");
        // }
        // else{
            const { email,password } = loginInfo;
            await fetch('http://localhost:5000/login',{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email , password })
            })
            .then(res => res.json())
            .then(res => {
                if(res.error){
                    toast.error(res.error)
                }
                else{
                    localStorage.setItem("token", res.Token);
                    navigate("/AddPost");
                    window.location.reload();
                }
            }).catch(err => toast.error(err))
        // }


    } 

    return (
        <>
            <Container>
                <h2 className='text-center'>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={loginInfo.name} onChange={handleInput} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={loginInfo.password} onChange={handleInput} required />
                    </Form.Group>

                    <Button className="mb-2" variant="primary" type="submit">
                        Submit
                    </Button>

                    <Form.Text>
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </Form.Text>
                </Form>
            </Container>
        </>
    );
}

export default Login1;