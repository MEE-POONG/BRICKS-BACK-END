import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Button, Form, Image, InputGroup, Row, Col } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'

export default function PromotionPage() {

    // modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const ShowModalCreate = () => setShowModalCreate(true);
    const ShowModalEdit = () => setShowModalEdit(true);
    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false)};

    return (
        <>
            <Container fluid className="pt-4 px-4">
                <div className="bg-secondary text-center rounded shadow p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">รายการเข้าร่วม</h6>
                        <Button variant="success" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start table-striped align-middle table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">รูปสินค้า</th>
                                    <th scope="col">ชื่อสินค้า</th>
                                    <th scope="col">ชื่อโปรโมชั่น</th>
                                    <th scope="col">โปรโมชั่น</th>
                                    <th scope="col">ราคาเดิม</th>
                                    <th scope="col">ราคาโปรโมชั่น</th>
                                    <th scope="col">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img className="rounded-circle flex-shrink-0" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                                    </td>
                                    <td>บ้องแก้ว</td>
                                    <td>9.9</td>
                                    <td>ซื้อ 5 แถม 1</td>
                                    <td className='text-decoration-line-through'>2000 บาท</td>
                                    <td className='text-danger'>1000 บาท</td>
                                    <td>
                                        <a className="btn btn-sm btn-success me-2" onClick={ShowModalEdit}><FaEdit /></a>
                                        <a className="btn btn-sm btn-danger me-2" href=""><FaTrash /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className="rounded-circle flex-shrink-0" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                                    </td>
                                    <td>บ้องขวดอิชิตัน</td>
                                    <td>420</td>
                                    <td>ซื้อ 1 แถม 20</td>
                                    <td className='text-decoration-line-through'>50 บาท</td>
                                    <td className='text-danger'>20 บาท</td>
                                    <td>
                                        <a className="btn btn-sm btn-success me-2" onClick={ShowModalEdit}><FaEdit /></a>
                                        <a className="btn btn-sm btn-danger me-2" href=""><FaTrash /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img className="rounded-circle flex-shrink-0" src={'./images/user.jpg'} alt="" style={{ width: "40px", height: "40px" }} />
                                    </td>
                                    <td>เซ็ตดูดจนลอย</td>
                                    <td>WeedDays</td>
                                    <td>ซื้อ 1 แถม 1</td>
                                    <td className='text-decoration-line-through'>5000 บาท</td>
                                    <td className='text-danger'>2000 บาท</td>
                                    <td>
                                        <a className="btn btn-sm btn-success me-2" onClick={ShowModalEdit}><FaEdit /></a>
                                        <a className="btn btn-sm btn-danger me-2" href=""><FaTrash /></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>

            {/* Create */}
            <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มโปรโมชั่น</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Select>
                            <option>--- เลือกสินค้า ---</option>
                            <option value={1}>บ้อง</option>
                            <option value={2}>บ้องขวดอิชิตัน</option>
                            <option value={3}>กัญชา</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>ชื่อโปรโมชั่น</Form.Label>
                        <Form.Control type="text" defaultValue={""} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดโปรโมชั่น</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={""} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>สูตรคำนวน</Form.Label>
                        <Form.Control type="text" defaultValue={""} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="number" defaultValue={""} />
                            <InputGroup.Text>บาท</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success">
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>

             {/* Edit */}
             <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>แก้ไขโปรโมชั่น</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" defaultValue={"บ้องแก้ว"} disabled/>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>ชื่อโปรโมชั่น</Form.Label>
                        <Form.Control type="text" defaultValue={"9.9"} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดโปรโมชั่น</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={"ซื้อ 5 แถม 1"} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>สูตรคำนวน</Form.Label>
                        <Form.Control type="text" defaultValue={"x*(0.5)"} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="number" defaultValue={"2000"} />
                            <InputGroup.Text>บาท</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success">
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
PromotionPage.layout = IndexPage