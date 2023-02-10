import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'

export default function HowtoplaceOderPage() {

    const [{ data: aboutData,loading,error }, getHowtoplaceOder] = useAxios({
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
            <Card className="text-center rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                        รายละเอียดข้อมูลวิธีการสั่งซื้อ
                    </Card.Title>
                </div>
                <MyTable aboutData={aboutData} getHowtoplaceOderData={getHowtoplaceOder} />
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
                            <Col >
                            {newFunction("ชื่อหัวข้อหลัก", item?.headtitle )}
                            {newFunction("ชื่อหัวข้อหลัก", item?.title )}
                            {newFunction("ชื่อหัวข้อ1", item?.steps1 )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.substeps1}} />
                            {newFunction("ชื่อหัวข้อ2", item?.steps1 )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.substeps2}} />
                            {newFunction("ชื่อหัวข้อ3", item?.steps1 )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.substeps3}} />
                            </Col>
                            <Col>
                            {newFunction("ชื่อหัวข้อ4", item?.steps4 )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.substeps4}} />
                            {newFunction("ชื่อหัวข้อ5", item?.steps5 )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.substeps5}} />
                            </Col>
                        </Row>
                        <br/>
                            <AboutEditModal value={item} getHowtoplaceOderData={props?.getHowtoplaceOderData} />
                    </div>
                ))
            }    
  
   </>     
    );

    function newFunction(label, value) {
        return <div className="mb-3 mt-2 fonT ">
         <strong> {label} </strong>
          <input className="form-control" value={value} readonly />
        </div>;
      }
}

HowtoplaceOderPage.layout = IndexPage