/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import React from "react";
import Head from "next/head";
import BackGroundMain from "@/components/Bg/BackGroundMain";
import { Image } from "react-bootstrap";

export default function AdderssUserPage() {
  return (
    <>
      <Head>
        <title>Shang Pong</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="/images/logo2.png" />
      </Head>

      <BackGroundMain />

      <div id="sign-user" name="sign-user" className="sign-user">
        <div className="wrapper">
          <div className="logo">
            <img
              src="/images/logo1.png"
              alt=""
            />
          </div>
          <div className="text-center mt-4 name">Shang Pong</div>
          <form className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
              <span className="far fa-user"></span>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Username"
              />
            </div>
            <div className="form-field d-flex align-items-center">
              <span className="fas fa-key"></span>
              <input
                type="password"
                name="password"
                id="pwd"
                placeholder="Password"
              />
            </div>
            <button className="btn mt-3">Login</button>
          </form>
          <div className="text-center fs-6">
            <a href="#">Forget password?</a>
          </div>
        </div>
      </div>
    </>
  );
}
