import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Card, Row, Col} from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import ContactEditModal from '@/components/Contact/ContactEditModal'

export default function ProductPage() {

    const [{ data: contactData,loading,error }, getContact] = useAxios({
        url: "/api/contact",
      });


    if (loading) {
        return <PageLoading />;
    }
    if (error) {
        return <PageError />;
    }
    return (
        <Container fluid className="pt-4 px-4">
            <Card className=" text-center rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                        ช่องทางการติดต่อ
                    </Card.Title>
                </div>
                <MyTable contactData={contactData} getContactData={getContact} />
            </Card >
        </Container >
    );
}

function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.contactData);
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
                        <br/>
                            <ContactEditModal value={item} getContactData={props?.getContactData} />
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