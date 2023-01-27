import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import AboutEditModal from '@/container/About/AboutEditModal'

export default function ProductPage() {

    const [{ data: aboutData,loading,error }, getAbout] = useAxios({
        url: "/api/about",
      });


    if (loading) {
        return <PageLoading />;
    }
    if (error) {
        return <PageError />;
    }
    return (
        <Container fluid className="pt-4 px-4">
            <Card className="bg-secondary text-center rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                        รายการสินค้า
                    </Card.Title>
                </div>
                <MyTable aboutData={aboutData} getAboutData={getAbout} />
            </Card >
        </Container >
    );
}

function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.aboutData);
    console.log(currentItems);
    useEffect(() => {
        setCurrentItems(currentItems);
        console.log(props);
    }, [props]);

    return (
   <>
               
            {    currentItems?.map((item, index) => (
                    <div key={index}>

                        <Row>
                            <Col>
                            {newFunction("ที่ตั้ง", item?.address )}
                            {newFunction("เบอร์มือถือ", item?.tel )}
                            {newFunction("อีเมล์", item?.email )}
                            {newFunction("Facebook", item?.facebook )}
                            {newFunction("ลิงค์ Facebook", item?.linkFacebook )}
                            {newFunction("Line", item?.line )}
                            {newFunction("ลิงค์ Line", item?.linkLine )}
                            </Col>
                            <Col>
                            {newFunction("ลิงค์ Map", item?.linkMap )}
                            <div className=" mt-4 w-100 h-75">
                                <iframe
                                src={item?.linkMap}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className=" w-100 h-100 "
                                ></iframe>
                            </div>
                            </Col>
                        </Row>
                            <AboutEditModal value={item} getAboutData={props?.getAboutData} />
                    </div>
                ))
            }    
  
   </>     
    );

    function newFunction(label, value) {
        return <div class="">
          <label>{label}</label>
          <input class="form-control" value={value} readonly />
        </div>;
      }
}

ProductPage.layout = IndexPage