/* eslint-disable @next/next/no-html-link-for-pages */

import React from "react";
import Head from 'next/head';
import BackGroundMain from "@/components/Bg/BackGroundMain";
import { Image } from 'react-bootstrap';

export default function AdderssUserPage() {
    return (
        <>

            <Head>
                <title>PigJungle</title>
                <meta
                    name="description"
                    content="I2AROBOT 2"
                />
                <link rel="icon" href="/images/logo.png" />
            </Head>

            <BackGroundMain />

            <div id='sign-user' name="sign-user" className='sign-user'>

                <div className="topnav  justify-content-around">

                    <a className='btunav ' type='SignIn' href="/">กลับ</a>


                </div>
                <div className='box-Container-Si'>


                
                        <div className="box-img">
                            <Image src={'images/moke02.png'} width={'50%'} />
                        </div>



                    <div className='Container-Si'>

                        <Image src={'images/profile.jpg'} className='img-Si-Su' />

                        <form>

                            <input className='input-Si-Su' type="text" id="Email" name="Email" placeholder="Email" />

                            <input className='input-Si-Su' type="password" id="Password" name="Password" placeholder="Password" />


                        </form>
                        <div className='box-btu-Si-Su'>
                            <a className='btu-Si-Su-Ad' type='SignIn'>เข้าสู่ระบบ</a>
                        </div>
                        <div className="box-text">
                            <a className='text-Si-Su' type='SignIn' href="">ลืมรหัสผ่าน?</a>
                        </div>


                    </div>

                    <div className="box-img">
                        <Image  src={'images/moke03.png'} width={'50%'} />
                    </div>

                </div>
            </div>

        </>
    );
}
