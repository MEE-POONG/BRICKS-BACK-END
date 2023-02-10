import React, { useState } from 'react'
import { Modal, Button ,Image } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function PolicyDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deletePolicyLoading, error: deletePolicyError }, executePolicyDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executePolicyDelete({
            url: '/api/policy/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getData(),
            ]).then(() => {
                if (deletePolicyLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deletePolicyLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deletePolicyError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix='delete' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaTrash />
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>ลบรายการนโยบาย</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>ชื่อนโยบาย <span className='text-danger'> {props?.value?.headpolicy}</span></Modal.Title>
                    <Modal.Title>รายละเอียดนโยบาย : <span className='text-danger'><div dangerouslySetInnerHTML={{ __html: props?.value?.subpolicy}} /></span></Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                    <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bg="succeed" className="my-0" onClick={handleDeleteData}>
                        ยืนยันการลบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}