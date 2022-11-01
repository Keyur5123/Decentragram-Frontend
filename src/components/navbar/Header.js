import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import { Navigate, useHistory } from "react-router-dom";

function Header() {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handlerUser = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <h4 className="text-body-50">
          <img src="logo192.png" alt="img" width="30" height="30" />
          Social media{" "}
        </h4>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="btn-group" role="group" aria-label="Basic example">
            {(() => {
              if (token) {
                return (
                  <div>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/AddPost">
                        AllPost
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/Chat">
                        Chat
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/MyPost">
                        MyPost
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/profile">
                        Profile
                      </Link>
                    </button>
                    <button type="button" className="btn btn-white">
                      <Link className="text-body" to="/logout">
                        Logout
                      </Link>
                    </button>
                  </div>
                );
              } else {
                return <Link className="text-body" to="/"></Link>;
              }
            })()}
          </div>



          {/* <div className="">
            {(() => {
              if (token) {
                return (
                  <button type="button" className="btn btn-white">
                    <Link className="text-body" to="logout">
                      Logout
                    </Link>
                  </button>
                );
              } else {
                return (
                  <button type="button" className="btn btn-white">
                    <Link className="text-body" to="login">
                      Login
                    </Link>
                  </button>
                );
              }
            })()}
          // </div> */}
      {/* </div> */}
      {/* // </nav> */}



      <div>
        {/* className='position-fixed fixed-top' */}
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt="logo"
                src="logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Decentragram  
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav " className='nav__header'>
              <Nav className="ml-auto nav__header  text-center">
                {token ?
                  <>
                    <Nav.Item>
                      <LinkContainer className="text-center" to="/">
                        <Nav.Link eventKey="link-0">AllPost</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to="/Chat">
                        <Nav.Link eventKey="link-1">Chat</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to="/MyPost">
                        <Nav.Link eventKey="link-2">MyPost</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to="/profile">
                        <Nav.Link eventKey="link-3">Profile</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      {/* <LinkContainer to="/logout"> */}
                      <Nav.Link eventKey="link-4" onClick={handlerUser}>Logout</Nav.Link>
                      {/* </LinkContainer> */}
                    </Nav.Item>
                  </>
                  :
                  <>
                    <Nav.Item>
                      <LinkContainer to="/">
                        <Nav.Link eventKey="link-5">Login</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to="/register">
                        <Nav.Link eventKey="link-6">Register</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                  </>
                }
              </Nav>
            </Navbar.Collapse>


          </Container>
        </Navbar>



      </div>
    </>
  );
}

export default Header;
