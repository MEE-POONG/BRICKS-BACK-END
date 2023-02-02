import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function TeamDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deleteSubTypeLoading, error: deleteSubTypeError }, executeSubTypeDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executeSubTypeDelete({
            url: '/api/subType/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getData(),
            ]).then(() => {
                if (deleteSubTypeLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deleteSubTypeLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deleteSubTypeError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix='delete' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaTrash />
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ลบรายการทีมและตำแหน่ง</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>ชื่อประเภทสินค้า : <span className='text-danger'> {props?.value?.name}</span></Modal.Title>
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