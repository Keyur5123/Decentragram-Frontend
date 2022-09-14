import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [proFilePath, setProFilePath] = useState();

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
        var dbObj = value.data.data;
        var dbuserName = dbObj.userName;
        setName(dbuserName);
        var dbuserEmail = dbObj.email;
        setEmail(dbuserEmail);
        var dbuserProImg = dbObj.image;
        setProFilePath(dbuserProImg);
      })
      .catch((err) => {
        console.log("get userdata error </br>" + err);
      });
  };

  const handlerChange = (e) => {
    if (e.target.name === `name`) {
      setName(e.target.value);
    }
    if (e.target.name === `email`) {
      // console.log(e.target.value);
      setEmail(e.target.value);
    }
    if (e.target.name === `image`) {
      setImage(e.target.files[0]);
    }
    console.log(e.target.files[0]);
  };
  
  const handlersubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    var token = localStorage.getItem("token");
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("image", image);

    axios
      .post("http://localhost:5000/profile", formdata, {

        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        if (response.data.error) {
          console.log("response.data.error", response);
          toast.error(response.data.error);
        }
        if (response.data.data) {
          toast.info("update succesfuly");
          getUserData();
        }
      })
      .catch(function (error) {
        console.log("error", error);
        // toast.error(error.massege);
      });
  };

  return (
    <>
      <div className="container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-body">
            <div className="container mb-3">

              <div style={{ width: "300px" }}>
                <img
                  src={`http://localhost:5000/${proFilePath}`}
                  className="img-thumbnail"
                  alt="profile_image "
                />
              </div>

              <br />

              <form className="profile" onSubmit={(e) => handlersubmit(e) }>
                
                <div className="form-floating mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="floatingInput"
                    name="image"
                    placeholder="image"
                    onChange={(e) => {
                      handlerChange(e);
                    }}
                  />
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      handlerChange(e);
                    }}
                  />
                </div>

                <div className=" form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    name="email"
                    value={email}
                    placeholder="Email address"
                    onChange={(e) => {
                      handlerChange(e);
                    }}
                  />
                </div>

                <div className="form-floating mb-3">
                  <button type="submit" className="btn btn-primary">
                    update
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
