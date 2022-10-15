import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container } from "@material-ui/core";
import { Button, Form, ToastHeader } from "react-bootstrap";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DatePicker from 'react-date-picker';

function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profileimage, setProfileImage] = useState();
  const [proFilePath, setProFilePath] = useState();
  const [total_Post, setTotal_Post] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState();
  const [birthDate, setBirthDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    var token = localStorage.getItem("token");
    var apiData = axios.get("http://localhost:5000/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    apiData
      .then((value) => {
        console.log("value.data.data :_ ", value.data.data);
        var dbObj = value?.data?.data;
        setName(dbObj?.userName);
        setEmail(dbObj?.email);
        setProFilePath(dbObj?.image);
        setPhoneNumber(dbObj?.phone_number)
        setBirthDate(dbObj?.birthDate)
        setTotal_Post(value?.data?.total_Post)
      })
      .catch((err) => {
        toast.error(err)
      });
  };

  const handlersubmit = (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    try {

      let formdata = new FormData();

      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("image", profileimage);
      formdata.append("birthDate", JSON.stringify(birthDate));

      axios.post("http://localhost:5000/profile", formdata, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then(function (response) {
          if (response.data.error) {
            toast.error(response.data.error);
          }
          if (response.data.data) {
            console.log("formdata :- ", response.data.data);
            toast.info("update succesfuly");
            getUserData();
          }
        })
        .catch(function (error) {
          toast.error(error.massege);
        });

      if (phoneNumber.charAt(3) === '8' || phoneNumber.charAt(3) === '9' ||
        phoneNumber.charAt(3) === '5' || phoneNumber.charAt(3) === '6') {
        formdata.append("phoneNumber", phoneNumber);
      }
    } catch (error) {
      toast.error(error);
    }

  };

  return (
    <>
      <Container>
        <div className="mt-3 profile__Header align-items-center justify-content-center">
          <img
            src={`http://localhost:5000/${proFilePath}`}
            className='img-fluid rounded-circle'
            alt="profile_image "
            width="193"
          // height="130"
          />
          <div>
            <h3 className="user__name">{name}</h3>
            <span className="d-flex user__totalPosts"><h6 className="mr-2 mt-1">{total_Post.length}</h6> posts</span>
          </div>
        </div>

        <div>
          <Form className="mt-3" onSubmit={handlersubmit}>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose photo to be set as Profile...</Form.Label>
              <Form.Control type="file" placeholder='Choose 1 pic at a time...' onChange={e => setProfileImage(e.target.files[0])} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <PhoneInput
              onlyCountries={['in']}
              country={'in'}
              value={phoneNumber}
              className="mb-4 mt-4"
              onChange={phone => setPhoneNumber('+' + phone)}
            />
            <div className="d-flex">
              <DatePicker className="mb-4" onChange={setBirthDate} />
              {birthDate && <p className="ml-3">The Birthdate is :- {birthDate?.split(' ')?.slice(1, 4)?.join(' ')}</p>}
            </div>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default Profile;
