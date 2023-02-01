import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Widget() {
    return(
        <>
        <Container fluid className="pt-4 px-4 element">
            <Row>
            <Col sm={4} md={3}>
                    <Card>
                    <Card.Body>
                    <p>ออเดอร์วันนี้</p>
                    <hr />
                    <Card.Title className=" text-success card-title">10</Card.Title>
                    </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} md={3}>
                    <Card>
                    <Card.Body>
                    <p>รายได้วันนี้</p>
                    <hr />
                    <Card.Title className=" text-success card-title">10</Card.Title>
                    </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} md={3}>
                    <Card>
                    <Card.Body>
                    <p>รายได้รวม</p>
                    <hr />
                    <Card.Title className=" text-success card-title">10</Card.Title>
                    </Card.Body>
                    </Card>
                </Col>
                <Col sm={4} md={3}>
                    <Card >
                    <Card.Body>
                    <p>จำนวนสมาชิก</p>
                    <hr />
                    <Card.Title className=" text-success card-title">10</Card.Title>
                    </Card.Body>
                    </Card>
                </Col>
               
            </Row>
        </Container>
        </>
    )
}