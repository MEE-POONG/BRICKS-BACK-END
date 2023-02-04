import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function UsersDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deleteUsersLoading, error: deleteUsersError }, executeUsersDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executeUsersDelete({
            url: '/api/users/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getUsers(),
            ]).then(() => {
                if (deleteUsersLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deleteUsersLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deleteUsersError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix='delete' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaTrash />
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ลบรายการสมาชิก
                    <span className='text-danger'> {props?.value?.fname}</span> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>ชื่อจริง : <span className='text-danger'> {props?.value?.fname}</span></Modal.Title>
                    <Modal.Title>นามสกุล : <span className='text-danger'> {props?.value?.lname}</span></Modal.Title>
                    <Modal.Title>เบอร์โทร : <span className='text-danger'> {props?.value?.tel}</span></Modal.Title>
                    <Modal.Title>อีเมล์ : <span className='text-danger'> {props?.value?.email}</span></Modal.Title>
                    <Modal.Title>ชื่อผู้ใช้ : <span className='text-danger'> {props?.value?.username}</span></Modal.Title>
                    <Modal.Title>รหัสผ่าน : <span className='text-danger'> {props?.value?.password}</span></Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                <Button bg="cancel" className='my-0' onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bg="danger"className="my-0 btn-danger"  onClick={handleDeleteData}>
                        ยืนยันการลบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}