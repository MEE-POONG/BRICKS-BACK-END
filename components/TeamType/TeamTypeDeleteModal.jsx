import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function TeamTypeDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deleteTeamTypeLoading, error: deleteTeamTypeError }, executeTeamTypeDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executeTeamTypeDelete({
            url: '/api/teamType/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getTeam(),
            ]).then(() => {
                if (deleteTeamTypeLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deleteTeamTypeLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deleteTeamTypeError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix='delete' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaTrash />
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ลบรายการประเภทสิทธิ์ผู้ใช้</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>ชื่อประเภทสิทธิ์ผู้ใช้ : <span className='text-danger'> {props?.value?.name}</span></Modal.Title>
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