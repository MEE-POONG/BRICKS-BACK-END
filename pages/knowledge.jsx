import Head from 'next/head';
import { useState, useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Image, Table, Button, Form, OverlayTrigger, Badge, Modal, Row } from 'react-bootstrap';
import Editor from '@/components/Ckeditor/Editor';

export default function KnowledgePage() {

    // ----ing-----
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [image])

    const onImageProductChange = (e) => {
        setImage([...e.target.files])
    }

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

                    <div className="bg-secondary rounded p-4">

                        <h6 className="mb-4"> เกร็ดความรู้</h6>
                        <form>
                            <div className="mb-3">
                                <label for="Inputname" className="form-label">หัวข้อ</label><br />
                               
                                <input type="text" className="form-control" style={{ width: "500px" }}  />
                                <div className="mb-3">
                                    <label for="Inputphone" className="form-label">เนื้อหา</label>
                                    <Editor/>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success"  >ยืนยัน</button>
                        </form>
                    </div>

                    
                </Row>


            </Container>
        </ >
    );
}
KnowledgePage.layout = IndexPage;
