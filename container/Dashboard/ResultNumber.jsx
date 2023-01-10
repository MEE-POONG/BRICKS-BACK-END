import React from 'react';
import { Container } from 'react-bootstrap';
import { FaChartArea, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

export default function ResultNumber() {
    return (
        <>
            <Container fluid className="pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-secondary rounded shadow d-flex align-items-center justify-content-between p-4">
                            <FaChartLine className="text-primary display-5" />
                            <div className="ms-3">
                                <p className="mb-2">Today Sale</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-secondary rounded shadow d-flex align-items-center justify-content-between p-4">
                            <FaChartBar className="text-primary display-5" />
                            <div className="ms-3">
                                <p className="mb-2">Total Sale</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-secondary rounded shadow d-flex align-items-center justify-content-between p-4">
                            <FaChartArea className="text-primary display-5" />
                            <div className="ms-3">
                                <p className="mb-2">Today Revenue</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-xl-3">
                        <div className="bg-secondary rounded shadow d-flex align-items-center justify-content-between p-4">
                            <FaChartPie className="text-primary display-5" />
                            <div className="ms-3">
                                <p className="mb-2">Total Revenue</p>
                                <h6 className="mb-0">$1234</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
