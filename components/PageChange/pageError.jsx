import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Form, Image, InputGroup, Row, Col, Table } from 'react-bootstrap'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'

export default function PageError() {

    return (
        <>
            <Container fluid className="p-4 page-change mb-4">
                <Card className='error'>
                    <h1>Error</h1>

                </Card>
            </Container>


        </>
    )
}
