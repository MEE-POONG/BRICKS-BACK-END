import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { FaChartArea, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

export default function PeakGraph() {
    return (
        <>
            <Container fluid className="pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-12 col-xl-6">
                        <div className="bg-secondary shadow text-center rounded p-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h6 className="mb-0">Worldwide Sales</h6>
                                <a href="">Show All</a>
                            </div>
                            <canvas id="worldwide-sales"></canvas>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-6">
                        <div className="bg-secondary shadow text-center rounded p-4">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h6 className="mb-0">Salse & Revenue</h6>
                                <a href="">Show All</a>
                            </div>
                            <canvas id="salse-revenue"></canvas>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
