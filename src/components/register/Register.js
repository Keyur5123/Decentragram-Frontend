import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Carousel from "../assets/Carousel1";
import DatePicker from 'react-date-picker';

function Register(props) {
    const navigate = useNavigate();
    const [registerInfo, setRegisterInfo] = useState({ name: '', email: '', password: '', Confirmpassword: '' });
    const [birthDate, setBirthDate] = useState(new Date().toLocaleString());

    console.log("birthDate :- ", typeof birthDate);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterInfo({ ...registerInfo, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(!loginInfo.email){
        //     toast.error("email is require");
        // }
        // else if(!loginInfo.password){
        //     toast.error("password is require");
        // }

        if (!(registerInfo.Confirmpassword === registerInfo.password)) {
            toast.error("password not a match");
        }
        else {
            const { name, email, password, Confirmpassword } = registerInfo;

            await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, Confirmpassword })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        toast.error(res.error);
                    }
                    else {
                        console.log(">>>>>>>>>>>>>>>> ");
                        navigate("/");
                        // window.location.reload();
                    }
                }).catch(err => toast.error(err))
        }


    }

    return (
        <>
            <Carousel />
            <Container>
                <h2 className='text-center'>Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name="name" value={registerInfo.name} onChange={handleInput} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={registerInfo.email} onChange={handleInput} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={registerInfo.password} onChange={handleInput} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" name="Confirmpassword" value={registerInfo.Confirmpassword} onChange={handleInput} required />
                    </Form.Group>

                    <div className="d-flex">
                        <DatePicker className="mb-4" onChange={setBirthDate} value={birthDate} />
                        {/* {birthDate && <p className="ml-3">The Birthdate is :- {birthDate?.split(' ')?.slice(1, 4)?.join(' ')}</p>} */}
                    </div>

                    <Button className="mb-2" variant="primary" type="submit">
                        Submit
                    </Button>

                    <Form.Text>
                        Have an account? <Link to="/">Login</Link>
                    </Form.Text>
                </Form>
            </Container>
        </>
    );
}

export default Register;