import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Container, Image, Card, Row, Col } from 'react-bootstrap';
import { FaChartArea, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

export default function Warn(props) {
    const [contactList, setContactList] = useState();
    const [warnCheckEditLogList, setWarnCheckEditLogList] = useState();
    const [warnAudienceRecordList, setWarnAudienceRecordList] = useState();
    useEffect(() => {
        setContactList(props.contactData)
        setWarnCheckEditLogList(props.checkEditLogData);
        setWarnAudienceRecordList(props.audienceRecordData)
    }, [props])

    return (
        <Row className='warn mx-4 mt-4'>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title className='text-center'>
                            ติดต่อเรา
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {contactList?.map((list, key) => (
                            <Link key={key} href={"/contact/" + list.id}>
                                <a className="alert alert_warning">
                                    <Card.Title>{list.title}</Card.Title>
                                    <Card.Text>{list.detail}</Card.Text>
                                </a>
                            </Link>
                        ))}
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title className='text-center'>
                            แก้ไขเปลี่ยนแปลงข้อมูล
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {warnCheckEditLogList?.map((list, key) => (
                            <Link key={key} href={"/" + list.tagLink + "/" + list.id}>
                                <a className="alert alert_warning">
                                    <Card.Title className="alert--content">{list.title}</Card.Title>
                                    <Card.Text>{list.detail}</Card.Text>
                                </a>
                            </Link>
                        ))}
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header>
                        <Card.Title className='text-center'>
                            รายงานการเข้าชมเว็บ
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {warnAudienceRecordList?.map((list, key) => (
                            <Link key={key} href={"/" + list.tagLink + "/" + list.id}>
                                <a className="alert">
                                    <Card.Title>{list.title}</Card.Title>
                                    <Card.Text>{list.detail}  คน</Card.Text>
                                </a>
                            </Link>
                        ))}
                    </Card.Body>
                </Card>
            </Col>
        </Row>

    );
}
