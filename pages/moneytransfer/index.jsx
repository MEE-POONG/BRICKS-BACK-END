import Head from 'next/head';
import { useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaTimes, FaEye, FaEdit, FaHandHoldingUsd } from 'react-icons/fa';
import Link from 'next/link';
export default function MoneyTransferPage() {
  const router = useRouter();
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const createClose = () => setCreateModal(false);
  const createShow = () => setCreateModal(true);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);
  return (
    < >
      <Head>
        <title>HOME | dxx=</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0 w-m-max me-2">รายการการโอนเงิน</h6>
            <input className="form-control bg-dark border-0" type="text" placeholder="ค้นหารายการ" />
            <Button variant="primary" className='ms-2 w-m-max' onClick={createShow}>
              สร้างรายการโอน
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="w-100">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <span>โอนรายได้พันธมิตร จันทร์ 12 ก.ย. 2562</span>
                <div className='manager'>
                  <OverlayTrigger
                    placement="bottom" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip" >โอนเงิน</Tooltip>} >
                    <Link href='./moneytransfer/transfer'>
                      <Button className="btn btn-sm mx-1">
                        <FaHandHoldingUsd />
                      </Button>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip" >แก้ไขรายการโอน</Tooltip>} >
                    <Link href='./moneytransfer/edit'>
                      <Button className="btn btn-sm mx-1">
                        <FaEdit />
                      </Button>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom" delay={{ show: 250, hide: 400 }} overlay={<Tooltip id="button-tooltip" >ลบโปรเจคโอน</Tooltip>} >
                    <Button className="btn btn-sm mx-1" onClick={deleteShow}>
                      <FaTimes />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>


        </div>
      </Container>
      <Modal show={createModal} onHide={createClose} centered className="bg-templant">
        <Modal.Header closeButton >
          <Modal.Title>สร้างโปรเจคการโอนเงิน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ชื่อโปรเจคการโอน</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>รายการโอนเงิน</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={createClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={createClose}>
            สร้าง
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={deleteModal} onHide={deleteClose} centered className="bg-templant">
        <Modal.Header closeButton >
          <Modal.Title>ต้องการลบโปรเจค .......</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>ยืนยันการลบข้อมูล</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={deleteClose}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </ >
  );
}
MoneyTransferPage.layout = IndexPage;