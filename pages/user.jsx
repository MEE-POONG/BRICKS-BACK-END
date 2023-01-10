import Head from 'next/head';
import { useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge, Modal } from 'react-bootstrap';
import { FaReply, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function TransferPage() {



  const data = {
    users: [
      {
        id: "1",
        image: "./images/user.jpg",
        name: "กัญ 01",
        email: "gg@gmail.com",
        tel: "022222222",
        date: "11/12/2022"
      },
      {
        id: "2",
        image: "./images/user.jpg",
        name: "กัญ 02",
        email: "gg@gmail.com",
        tel: "022222222",
        date: "11/12/2022"

      },
      {
        id: "3",
        image: "./images/user.jpg",
        name: "กัญ 03",
        email: "gg@gmail.com",
        tel: "022222222",
        date: "11/12/2022"

      },
      {
        id: "4",
        image: "./images/user.jpg",
        name: "กัญ 04",
        email: "gg@gmail.com",
        tel: "022222222",
        date: "11/12/2022"

      },
      {
        id: "5",
        image: "./images/user.jpg",
        name: "กัญ 05",
        email: "gg@gmail.com",
        tel: "022222222",
        date: "11/12/2022"

      },
      {
        id: "6",
        image: "./images/user.jpg",
        name: "กัญ 06",
        email: "gg@gmail.com",
        tel: "022222222",
        date: "11/12/2022"

      }
    ]
  }


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
            <h5 className="mb-0 w-m-max me-2">ชื่อผู้ใช้</h5>
            <Button variant="success" onClick={createShow}>
              <FaPlus />
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="table-responsive w-100">
              <Table className="table table-striped text-start align-middle  align-items-center table-hover ">

                <thead>
                  <tr>
                    <th >id</th>
                    <th >รูปผู้ใช้</th>
                    <th >ชื่อผู้ใช้</th>
                    <th >email</th>
                    <th >เบอร์โทรศัพท์</th>
                    <th >วันที่สมัคร</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((u) => (
                     <tr>
                    <th>{u.id}</th>
                    <td><img className="img-fluid rounded-circle mx-auto mb-4" src={u.image} style={{ width: "40px", height: "40px" }} /></td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.tel}</td>
                    <td>{u.date} </td>
                    <td>
                      <Button className="btn btn-sm btn-success me-2" onClick={editShow}><FaEdit /></Button>
                      <Button className="btn btn-sm btn-danger me-2" onClick={deleteShow}><FaTrash /></Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>

      <Modal show={createModal} onHide={createClose} centered className="bg-templant">
        <Modal.Header closeButton >
          <Modal.Title>เพิ่มสมาชิก</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>ชื่อผู้ใช้</Form.Label>
            <Form.Control type="text" defaultValue='' />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>email</Form.Label>
            <Form.Control type="text" defaultValue='' />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>เบอร์โทรศัพท์</Form.Label>
            <Form.Control type="text" defaultValue='' />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>รหัสผ่าน</Form.Label>
            <Form.Control type="password" />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>รูปผู้ใช้</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
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
            <Form.Control type="text" defaultValue='นายมา แล้วไปไหนไม่รู้' />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>email</Form.Label>
            <Form.Control type="text" defaultValue='gmail@hotmail.com' />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>เบอร์โทรศัพท์</Form.Label>
            <Form.Control type="text" defaultValue='08888888888' />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>รูปผู้ใช้</Form.Label>
            <Form.Control type="file" />
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
          <Modal.Title>ต้องการลบผู้ใช้ .......</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>ยืนยันการลบผู้ใช้</Form.Label>
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