import React, { useState } from 'react'
import { Modal, Button ,Image } from 'react-bootstrap'
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
            url: '/api/products/' + props?.value?.id,
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
                    <Modal.Title className='text-center'>ลบรายการสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={props?.value?.image}  width="150px" height="150px" className='object-fit-cover' />
                    <Modal.Title>ชื่อสินค้า : <span className='text-danger'> {props?.value?.name}</span></Modal.Title>
                    <Modal.Title>ประเภทสินค้า : <span className='text-danger'>{props?.value?.productType?.name}</span></Modal.Title>
                    <Modal.Title>ราคา : <span className='text-danger'> {props?.value?.price}</span></Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                    <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bg="succeed" className='my-0' onClick={handleDeleteData}>
                        ยืนยันการลบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}