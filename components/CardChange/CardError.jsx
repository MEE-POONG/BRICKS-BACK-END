import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Form, Image, InputGroup, Row, Col, Table } from 'react-bootstrap'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'

export default function CardError() {

    return (
        <div className="page-change">
            <Card className='error'>
                <div className="ring">
                    <h1>Error</h1>
                    <span></span>
                </div>
            </Card>
        </div>
    )
}
