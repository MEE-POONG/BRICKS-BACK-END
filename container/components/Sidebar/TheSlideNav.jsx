import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FaUsers,
  FaRegKeyboard,
  FaTh,
  FaTachometerAlt,
  FaUserEdit,
  FaLaptop,
  FaRegFileAlt,
  FaRegChartBar,
  FaBars,
  FaFunnelDollar,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { Image, Dropdown, Button } from "react-bootstrap";
import { BsFillBagFill } from "react-icons/bs";
import Link from "next/link";

export default function TheSlideNav() {
  const { asPath } = useRouter();
  const [checkClickPath, setCheckClickPath] = useState('/')
  useEffect(() => {
    setCheckClickPath(asPath);
  }, [asPath])

  return (
    <>
      <div className="sidebar pe-4 pb-3 ">
        <nav className="navbar bg-secondary navbar-dark">
          <Link href="/">
            <a className="navbar-brand mx-4 mb-3" >
              <h3 className="text-dark">
                <FaUserEdit className="fa me-2" />
                ร้านช่างพอง
              </h3>
            </a>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <Image
                className="rounded-circle"
                src={"/images/logo.png"}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <div className="bg-success roundedborder border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3 text-dark">
              <h6 className="mb-0 ">Shang Pong</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link href="/">
              <a className={asPath === "/" ? "nav-item nav-link active" : "nav-item nav-link"}>
                <i className="me-2">
                  <FaTachometerAlt />
                </i>
                Home
              </a>
            </Link>

            <Dropdown.Toggle onClick={() => { setCheckClickPath('/customer') }} className={checkClickPath === "/customer" || checkClickPath === "/customer/position" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
              <i className="me-2">
                <BsFillBagFill />
              </i>
              Customer
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/customer" || checkClickPath === "/customer/position"}>
              <Link id="buttons" href="/customer">
                <a className={asPath === "/customer" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                  สมาชิก
                </a>
              </Link>
              <Link id="buttons" href="/customer/position">
                <a className={asPath === "/customer/position" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                  ทีม
                </a>
              </Link>
            </Dropdown.Menu>


            <Dropdown.Toggle onClick={() => { setCheckClickPath('/products') }} className={checkClickPath === "/products" || checkClickPath === "/products/type" || checkClickPath === "/products/subType" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
              <i className="me-2">
                <BsFillBagFill />
              </i>
              จัดการสินค้า
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/products" || checkClickPath === "/products/type" || checkClickPath === "/products/subType"}>
              <Link id="buttons" href="/products">
                <a className={asPath === "/products" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                สินค้า
                </a>
              </Link>
              <Link id="buttons" href="/products/type">
                <a className={asPath === "/products/type" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                ประเภทสินค้า
                </a>
              </Link>
              <Link id="buttons" href="/products/subType">
                <a className={asPath === "/products/subType" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
                ประเภทย่อยสินค้า
                </a>
              </Link>
            </Dropdown.Menu>
          


          </div>
        </nav>
      </div>
    </>
  );
}
export function ButtonSlideNav() {
  const [slideOpen, setSlideOpen] = React.useState("");
  return (
    <Button
      bsPrefix="sidebar-toggler  bar-slide"
      onClick={() => setSlideOpen(slideOpen == "close" ? "open" : "close")}
    >
      <FaBars />
    </Button>
  );
}
