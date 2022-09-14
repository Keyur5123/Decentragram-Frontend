import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate  } from "react-router-dom";
import { toast } from "react-toastify";
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: null,
    };
  }
  // componentDidMount() {
  //   toast.info("An unexpected error occurred");
  // }
  async handlerChange(e) {
    // console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  async handlerSubmit(e) {
    e.preventDefault();
    if (!this.state.email) {
      toast.error("email is require");
    } else if (!this.state.password) {
      toast.error("password is require");
    } else {
      const { data } = await axios.post("http://localhost:5000/login", {
        email: this.state.email,
        password: this.state.password,
      });
      if (data.error) {
        toast.error(data.error);
      }
      if (data.Messege) {
        // toast.info(data.Messege);
        localStorage.setItem("token", data.Token);
        this.setState({ redirect: "/AddPost" });
        // window.location.reload();
        // window.location.href = "/addpost";
      }
      // console.log(data);
    }
  }
  render() {
    // console.log(this.state.redirect);
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} replace={true} />;
    }

    return (
      <>
        <div className="container mb-3">
          <br />
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              this.handlerSubmit(e);
            }}
          >
            <div className="form-group mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="email"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="password"
                onChange={(e) => {
                  this.handlerChange(e);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div>
              <p className="text-justify">
                Don't have an account?
                <Link to="/regster">singup</Link>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
}
