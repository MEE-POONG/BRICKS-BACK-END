import React, { useState } from 'react'
import { Modal, Button ,Image } from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import  {format}  from "date-fns";
export default function OrdersDeleteModal(props) {
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);
    const [{ loading: deleteOrdersLoading, error: deleteOrdersError }, executeOrdersDelete] = useAxios({}, { manual: true })
    const handleDeleteData = () => {
        executeOrdersDelete({
            url: '/api/orders/' + props?.value?.id,
            method: 'DELETE',
        }).then(() => {
            Promise.all([
                props.getData(),
            ]).then(() => {
                if (deleteOrdersLoading?.success) {
                    handleClose()
                }
            })
        })
    }

    if (deleteOrdersLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (deleteOrdersError) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

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
                    <h4 className="mb-3">ชื่อผู้สั่งสินค้า : {props?.value?.firstname}{" "}{props?.value?.lastname}</h4>
                    <h4 className="mb-3">วันที่สั่งซื้อ : {format(new Date(props?.value?.createdAt), "dd/MM/yyyy")}</h4>
                    <h4 className="mb-3">เวลาที่สั่งซื้อ : {format(new Date(props?.value?.createdAt), "HH:mm:ss")}{" "}น.</h4>
    
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