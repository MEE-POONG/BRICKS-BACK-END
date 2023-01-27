import React, { useState } from "react";
import Link from "next/link";
// components
import { NavDropdown, Image, Navbar, Button } from 'react-bootstrap';
import { FaBars, FaBell, FaRegEnvelope, FaUserEdit } from "react-icons/fa";
import { ButtonSlideNav } from "../Sidebar/TheSlideNav";


export default function IndexNavbar() {

  return (
    <>
      <Navbar className="navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
        <ButtonSlideNav />
        <form className="d-none d-md-flex ms-4">
          <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
        </form>

        <div className="navbar-nav align-items-center ms-auto">
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<>
              <i className="me-lg-2">
                <FaRegEnvelope />
              </i>
              <span className="d-none d-lg-inline-flex">Message</span>
            </>}
            menuVariant="dark"
          >
            <NavDropdown.Item href="#action/3.4">
              <div className="d-flex align-items-center">
                <Image className="rounded-circle" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <div className="d-flex align-items-center">
                <Image className="rounded-circle" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <div className="d-flex align-items-center">
                <Image className="rounded-circle" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4" className="text-center">
              See all notifications
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<>
              <i className="me-lg-2">
                <FaBell />
              </i>
              <span className="d-none d-lg-inline-flex">Notificatin</span>
            </>}
            menuVariant="dark"
          >
            <NavDropdown.Item href="#action/3.4">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </NavDropdown.Item>
            <hr className="dropdown-divider" />
            <NavDropdown.Item href="#action/3.4" className="text-center">
              See all notifications
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<>
              <Image className="rounded-circle me-lg-2" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
              <span className="d-none d-lg-inline-flex">มอง มอง</span>
            </>}
            menuVariant="dark"
          >
            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>
      {/* <Navbar bg="light" expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
        </Container>
      </Navbar> */}
    </>

  );
}
