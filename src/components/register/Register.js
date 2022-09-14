import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate  } from "react-router-dom";
import { toast } from "react-toastify";
export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      redirect: null,
    };
  }
  async handlerChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.value);
    // console.log(e.target.name);
  }
  async handlersubmit(e) {
    e.preventDefault();
    // const formdata = new FormData();
    if (!this.state.name) {
      toast.error("plses enter the name");
    } else if (!this.state.email) {
      toast.error("plses enter the email");
    } else if (!this.state.password) {
      toast.error("plses enter the password");
    } else if (!this.state.cpassword) {
      toast.error("plses enter the confirm password");
    } else if (!(this.state.cpassword === this.state.password)) {
      toast.error("password not a match");
    } else {
      // http://localhost:5000/register

      const { data } = await axios.post(`http://localhost:5000/register`, {
        username: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.info(data.message);

        this.setState({ redirect: "./" });
        window.location.href = "/login";
        window.location.reload();
      }
    }
    //    console.log(this.state.name);
    //     console.log("submit");
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} replace={true} />;
    }
    return (
      <>
        <br />
        <div className="container mb-3">
          <h1>sing up</h1>
          <br />
          <form
            className="singup"
            onSubmit={(e) => {
              this.handlersubmit(e);
            }}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                name="name"
                placeholder="Name"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className=" form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                placeholder="Email address"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="cpassword"
                className="form-control"
                id="floatingPassword"
                placeholder="confirm Password"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className="form-floating mb-3">
              <button type="submit" className="btn btn-primary">
                singup
              </button>
            </div>
          </form>
          <div>
            <p className="text-justify">
              Have an account?
              <Link to="/">login</Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}
