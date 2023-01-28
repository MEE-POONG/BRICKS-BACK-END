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


        <div className="navbar-nav align-items-center ms-auto">
      
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<>
              <Image className="rounded-circle me-lg-2" src={''} alt="" style={{ width: "40px", height: "40px" }} />
              <span className="d-none d-lg-inline-flex">Admin Shang Pong</span>
            </>}
            menuVariant="dark"
          >
            {/* <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item> */}
            <NavDropdown.Item href="sign_in">Log Out</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>
   
    </>

  );
}
