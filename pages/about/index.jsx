import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Card,Row, Col} from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import AboutEditModal from '@/components/About/AboutEditModal'

export default function AboutPage() {

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
            <Card className="text-center rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                        รายละเอียดข้อมูลเกี่ยวกับเรา
                    </Card.Title>
                </div>
                <MyTable aboutData={aboutData} getAboutData={getAbout} />
            </Card >
        </Container >
    );
}

function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.aboutData);
    // console.log(currentItems);
    useEffect(() => {
        setCurrentItems(currentItems);
        // console.log(props);
    }, [props]);

    return (
   <>
               
            {    currentItems?.map((item, index) => (
                    <div key={index}>

                        <Row>
                            <Col >
                            {newFunction("ชื่อหัวข้อหลัก", item?.headtitle )}
                            {newFunction("ชื่อหัวข้อ1", item?.history )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.subhistory}} />
                            {newFunction("ชื่อหัวข้อ2", item?.portfolio )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.subportfolio}} />
                            {newFunction("ชื่อหัวข้อ3", item?.headpolicy )}
                            <div className="box" dangerouslySetInnerHTML={{ __html: item?.subpolicy}} />
                            </Col>
                            <Col>
                            {newFunction("ชื่อหัวข้อวีดิโอ", item?.videotitle )}
                            {newFunction("ลิงค์วีดิโอ", item?.video )}
                            <div className=" mt-4 w-100 h-50">
                                <iframe
                                src={item?.video}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className=" w-100 h-100 "
                                ></iframe>
                            </div>          
                            </Col>
                        </Row>
                        <br/>
                            <AboutEditModal value={item} getAboutData={props?.getAboutData} />
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

AboutPage.layout = IndexPage