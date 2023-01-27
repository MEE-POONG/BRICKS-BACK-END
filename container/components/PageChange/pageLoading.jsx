import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Form, Image, InputGroup, Row, Col, Table } from 'react-bootstrap'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'

export default function PageLoading() {

    return (
        <>
            <Container fluid className="p-4 page-change mb-4">
                <Card className='loading'>
                    <div className="ring">
                        <h1>Loading</h1>
                        <span></span>
                    </div>
                </Card>
            </Container>


        </>
    )
}
