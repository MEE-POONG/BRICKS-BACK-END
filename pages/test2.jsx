import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Button, Form, Image, InputGroup, Row, Col } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { data_two } from './data';
import Header from '@/components/test/Header';
import Main from '@/components/test/Main';
import Basket from '@/components/test/Basket';
export default function TestPage() {
    const { listShfit } = data_two;
    const [allShiftcartItems, setCartItems] = useState([]);
    const [allShift, setAllShift] = useState([]);
    const onAdd = (addShift) => {
        const exist = allShift.find((x) => x.id === addShift.id);

        if (exist) {
            setAllShift(allShift.map((x) =>
                x.id === addShift.id ? { ...exist, AtOt: !exist.AtOt } : x
            ));
        } else {
            setAllShift([...allShift, { ...addShift, AtOt: false }]);
        }

    };
    // const onRemove = (product) => {
    //     const exist = cartItems.find((x) => x.id === product.id);
    //     if (exist.AtOt === 1) {
    //         setCartItems(allShift.find((x) => x.id !== product.id));
    //     } else {
    //         setCartItems(
    //             cartItems.map((x) =>
    //                 x.id === product.id ? { ...exist, AtOt: exist.AtOt - 1 } : x
    //             )
    //         );
    //     }
    // };
    return (
        <div >
            {
                listShfit.map((shift, num) => (
                    <div key={num} className='d-flex'>
                        <Button onClick={() => onAdd(shift)}>
                            {shift.shift}
                            {shift.id}
                        </Button>

                        {allShift.map((otShow, num2) => (
                            otShow.shift === shift.shift ?
                                < Button key={num2} onClick={() => onAdd(otShow)}>
                                    {otShow.shift}
                                    {otShow.id}
                                </Button> : ""
                        ))}
                    </div>
                ))
            }

            {/* <Button onClick={() => onAdd(item)}>
                a
            </Button>

            <Button onClick={() => onAdd(item)}>
                c
            </Button>
            <Button onClick={() => onAdd(item)}>
                d
            </Button>
            <Button onClick={() => onAdd(item)}>
                e
            </Button> */}
            {/* <Header countCartItems={cartItems.length}></Header>
            <div className="row">
                <Main products={products} onAdd={onAdd} />
                <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
            </div> */}
        </div >
    );
}
TestPage.layout = IndexPage