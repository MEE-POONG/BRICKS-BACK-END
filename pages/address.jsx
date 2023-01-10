import Head from 'next/head';
import { useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge ,Modal } from 'react-bootstrap';
import {FaReply,FaPlus,FaEdit,FaTrash } from 'react-icons/fa';
export default function TransferPage() {

    const [createModal, setCreateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
  
    const createClose = () => setCreateModal(false);
    const createShow = () => setCreateModal(true);

    const editClose = () => setEditModal(false);
    const editShow = () => setEditModal(true);
  
    const deleteClose = () => setDeleteModal(false);
    const deleteShow = () => setDeleteModal(true);
  return (
    < >
      <Head>
      <title>Pig Jungle</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">

            <h5 className="mb-0 w-m-max me-2">ที่อยู่ผู้ใช้</h5>
            <Button variant="success" onClick={createShow}>
              <FaPlus/>
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
          <div className="table-responsive w-100">
          <Table className="table table-striped text-start align-middle  align-items-center table-hover ">
                <thead>
                  <tr>
                    <th >id</th>
                    <th >user id</th>
                    <th >ชื่อผู้ใช้</th>
                    <th>บ้านเลขที่</th>
                    <th >จังหวัด</th>
                    <th >อำเภอ</th>
                    <th >ตำบล</th>
                    <th >รหัสไปรษณีย์</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>1</td>
                    <td>นายมา แล้วไปไหนไม่รู้</td>
                    <td>888 / 29</td>
                    <td>นครราชสีมา</td>
                    <td>เมือง</td>
                    <td>ในเมือง</td>
                    <td>30000</td>
                    <td>
                    <Button className="btn btn-sm btn-success me-2" onClick={editShow}><FaEdit/></Button>
                      <Button className="btn btn-sm btn-danger me-2" onClick={deleteShow}><FaTrash/></Button>
                    </td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>1</td>
                    <td>นายมา แล้วไปไหนไม่รู้</td>
                    <td>888 / 29</td>
                    <td>นครราชสีมา</td>
                    <td>เมือง</td>
                    <td>ในเมือง</td>
                    <td>30000</td>
                    <td>
                    <Button className="btn btn-sm btn-success me-2" onClick={editShow}><FaEdit/></Button>
                      <Button className="btn btn-sm btn-danger me-2" onClick={deleteShow}><FaTrash/></Button>
                    </td>
                  </tr>
                  <tr>
                    <th>1</th>
                    <td>1</td>
                    <td>นายมา แล้วไปไหนไม่รู้</td>
                    <td>888 / 29</td>
                    <td>นครราชสีมา</td>
                    <td>เมือง</td>
                    <td>ในเมือง</td>
                    <td>30000</td>
                    <td>
                    <Button className="btn btn-sm btn-success me-2" onClick={editShow}><FaEdit/></Button>
                      <Button className="btn btn-sm btn-danger me-2" onClick={deleteShow}><FaTrash/></Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>

      <Modal show={createModal} onHide={createClose} centered className="bg-templant">
        <Modal.Header closeButton >
          <Modal.Title>เพิ่มที่อยู่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>id ผู้ใช้</Form.Label>
            <Form.Select aria-label="Default select example">
                        <option disabled >--- เลือก id ผู้ใช้ ---</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ชื่อผู้ใช้</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>บ้านเลขที่</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>จังหวัด</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>อำเภอ</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ตำบล</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>รหัสไปรษณีย์</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={createClose}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={createClose}>
            สร้าง
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editModal} onHide={editClose} centered className="bg-templant">
        <Modal.Header closeButton >
          <Modal.Title>แก้ไขสมาชิก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ชื่อผู้ใช้</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>บ้านเลขที่</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>จังหวัด</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>อำเภอ</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ตำบล</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>รหัสไปรษณีย์</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={editClose}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteModal} onHide={deleteClose} centered className="bg-templant">
        <Modal.Header closeButton >
          <Modal.Title>ต้องการลบที่อยู่ของผู้ใช้ .......</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>ยืนยันการลบที่อยู่ของผู้ใช้</Form.Label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteClose}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={deleteClose}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </ >
  );
}
TransferPage.layout = IndexPage;