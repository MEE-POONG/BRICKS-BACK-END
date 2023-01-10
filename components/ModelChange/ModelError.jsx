import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Form, Image, InputGroup, Row, Col, Table, Modal } from 'react-bootstrap'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'

export default function ModelError({ showCheck, fnShow }) {

    return (
        <Modal show={showCheck} onHide={fnShow} centered size='lg'>
            <Modal.Body className="page-change">
                <div className='error'>
                    <h1>Error</h1>
                </div>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button bsPrefix="cancel" onClick={fnShow} className='my-0' >
                    ยกเลิก
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
