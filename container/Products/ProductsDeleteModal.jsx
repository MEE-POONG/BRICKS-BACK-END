import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
export default function ProductsDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deleteProductsLoading, error: deleteProductsError }, executeProductsDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executeProductsDelete({
            url: '/api/product/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getData(),
            ]).then(() => {
                if (deleteProductsLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deleteProductsLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deleteProductsError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

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
                    <Modal.Title>username : <span className='text-danger'> {props?.value?.username}</span></Modal.Title>
                    <Modal.Title>password : <span className='text-danger'>{props?.value?.password}</span></Modal.Title>
                    <Modal.Title>ชื่อ : <span className='text-danger'> {props?.value?.firstname}</span></Modal.Title>
                    <Modal.Title>นามสกุล : <span className='text-danger'>{props?.value?.lastname}</span></Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsPrefix="cancel" className='my-0' onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bsPrefix="succeed" className='my-0' onClick={handleDeleteData}>
                        ยืนยันการลบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}