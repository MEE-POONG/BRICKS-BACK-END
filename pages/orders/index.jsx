import React from "react";
import IndexPage from "components/layouts/IndexPage"
import { Card, Container, Form } from "react-bootstrap";


export default function Orders() {
    return (
        <>
        <Container fluid className="pt-4 px-4">
            <Card className="bg-secondary text-center rounded shadow p-4">
                <div className=" d-inline  justify-content-center ">


                    <Form.Group className="mb-3" >
                        <Form.Label>ค้นหาสินค้า</Form.Label>
                        <form className="d-none d-md-flex ms-4">
                        <input
                            className="form-control bg-dark border-0"
                            type="search"
                            placeholder="Search"
                        />
                        </form>
                    </Form.Group>

                </div>
            </Card >
        </Container >
        </>
    )
}
Orders.layout = IndexPage