import Head from 'next/head';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Image, Row } from 'react-bootstrap';
import React from "react";


export default function ContactPage() {
    const router = useRouter();
    return (
        < >
            <Head>
                <title>Pig Jungle</title>
                <meta
                    name="description"
                    content="I2AROBOT 2"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container fluid className=" pt-4 px-4">
                <Row className=" g-4">
                    <div className="col-sm-6 col-xl-6">
                        <div className="bg-secondary rounded h-100 p-4">
                            <h6 className="mb-4"> ข้อมูลติดต่อ </h6>
                            <form>
                                <div className="mb-3">
                                    <label for="Inputname" className="form-label">ชื่อของร้าน</label>
                                    <input type="text" className="form-control" style={{ width: "500px" }} id="#" placeholder='Pig jungle' />
                                    <div className="mb-3">
                                        <label for="Inputphone" className="form-label">เบอร์โทรศัพท์</label>
                                        <input type="tel" className="form-control" style={{ width: "500px" }} id="# " placeholder='065-065-8538' />
                                    </div>
                                    <div className="mb-3">
                                        <label for="Inputname" className="form-label">ลิงค์เพจเฟสบุค</label>
                                        <input type="text" className="form-control" style={{ width: "500px" }} id="#" placeholder='Pig jungle' />
                                    </div>
                                    <div className="mb-3">
                                        <label for="Inputphone" className="form-label">ลิงค์ไลน์</label>
                                        <input type="text" className="form-control" style={{ width: "500px" }} id="# " placeholder='@Pig_jungle' />
                                    </div>

                                    <div className="mb-3">
                                        <label for="Inputname" className="form-label">e-mail</label>
                                        <input type="email" className="form-control" style={{ width: "500px" }} id="#" placeholder='Pig_jungle@egmail.com' />
                                    </div>

                                    <div className="mb-3">
                                        <label for="Inputphone" className="form-label">ช่วงเวลาติดต่อ</label>
                                        <input type="text" className="form-control" style={{ width: "500px" }} id="# " placeholder='11.00-00.00 ' />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success" style={{ width: "100px" }} >ยืนยัน</button>
                            </form>
                        </div>
                    </div>


                    <div className="col-sm-12 col-xl-6">
                        <div className="bg-secondary rounded h-100 p-4">
                            <h6 className="mb-4"> แผนที่ตั้ง </h6>
                            <iframe className="position-relative rounded w-100 h-300"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493527.2919921313!2d101.49336638409545!3d14.89905149029705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311c2bb5aa80c05d%3A0xf0d75169f3e8a461!2sPetrol!5e0!3m2!1sen!2sth!4v1668670673320!5m2!1sen!2sth"
                                width="500"
                                height="350"
                                frameborder="0"
                                allowfullscreen=""
                                aria-hidden="false"
                                tabindex="0"
                                style={{ filter: " invert(2%) contrast(83%)", border: "1" }}></iframe>
                               <div className="mb-4"></div>
                               <label for="Inputmap" className="form-label">ลิงค์แผนที่ตั้ง</label> <br/>
                               <label for="url">Enter an https:// URL:</label>
                               <input type="url" name="url" id="url"
                                placeholder="https://example.com"
                                pattern="https://.*" size="30"
                                required></input>
                            
                            <div className="mb-3"></div>
                            <button type="submit" className="btn btn-success" style={{ width: "100px" }} placeholder='' >ยืนยัน</button>

                        </div>
                    </div>  
                </Row>
            </Container>
        </ >
    );
}
ContactPage.layout = IndexPage;

