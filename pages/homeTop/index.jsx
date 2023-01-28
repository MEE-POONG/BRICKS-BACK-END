import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
// import HomeTopEditModal from '@/container/HomeTop/HomeTopEditModal'

export default function ProductPage() {

    const [{ data: homeTopData,loading,error }, getHomeTop] = useAxios({
        url: "/api/homeTop",
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
                <MyTable homeTopData={homeTopData} getHomeTopData={getHomeTop} />
            </Card >
        </Container >
    );
}

function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.homeTopData);
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
                            {newFunction("ชื่อร้าน", item?.title )} 
                            </Col>
                           
                            <Col >
                            {newFunction("คำอธิบาย", item?.subTitle )} 
                            </Col>
                           
                        </Row>
                        <br/>
                            {/* <HomeTopEditModal value={item} getHomeTopData={props?.getHomeTopData} /> */}
                    </div>
                ))
            }    
  
   </>     
    );

    function newFunction(label, value) {
        return <div className="mb-3 fonT ">
         <strong> {label} </strong>
          <input className="form-control" value={value} readonly />
        </div>;
      }
}

ProductPage.layout = IndexPage