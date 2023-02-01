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
        <link rel="icon" href="/images/logo.png" />
      </Head>

      <BackGroundMain />

      <div id="sign-user" name="sign-user" className="sign-user">
        <div class="wrapper">
          <div class="logo">
            <img
              src="/images/logo.png"
              alt=""
            />
          </div>
          <div class="text-center mt-4 name">Shang Pong</div>
          <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
              <span class="far fa-user"></span>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Username"
              />
            </div>
            <div class="form-field d-flex align-items-center">
              <span class="fas fa-key"></span>
              <input
                type="password"
                name="password"
                id="pwd"
                placeholder="Password"
              />
            </div>
            <button class="btn mt-3">Login</button>
          </form>
          <div class="text-center fs-6">
            <a href="#">Forget password?</a>
          </div>
        </div>
      </div>
    </>
  );
}
