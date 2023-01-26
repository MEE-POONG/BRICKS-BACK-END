/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";

// components


export default function BackGroundMain() {
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return (
        <>
            <div className="position-fixed w-100 h-100 element" style={{ zIndex: "-1" }}>
                {[...Array(20).keys()].map(() => (
                    <div style={{ top: randomIntFromInterval(0, 100) + "%", left: randomIntFromInterval(0, 100) + "%", animation: "StarEffect " + randomIntFromInterval(2, 20) + "s ease infinite" }} className="star four-pointed-star"></div>
                ))}
            </div>
        </>
    );
}
