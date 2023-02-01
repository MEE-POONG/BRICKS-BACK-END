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

  return <>
    <div className="sidebar pe-4 pb-3 ">
      <nav className="navbar bg-secondary navbar-dark">
        <Link href="/" className="navbar-brand mx-4 mb-3">

          <h3 className="text-primary">
            <FaUserEdit className="fa me-2" />
            ร้านช่างพอง
          </h3>

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
          <div className="ms-3">
            <h6 className="mb-0 text-primary">Shang Pong</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Link
            href="/"
            className={asPath === "/" ? "nav-item nav-link active" : "nav-item nav-link"}>

            <i className="me-2">
              <FaTachometerAlt />
            </i>Home
          </Link>

          <Dropdown.Toggle onClick={() => { setCheckClickPath('/customer') }} className={checkClickPath === "/customer" || checkClickPath === "/customer/position" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            Customer
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/customer" || checkClickPath === "/customer/position"}>
            <Link
              id="buttons"
              href="/customer"
              className={asPath === "/customer" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                สมาชิก
              
            </Link>
            <Link
              id="buttons"
              href="/customer/position"
              className={asPath === "/customer/position" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
                ทีม
              
            </Link>
          </Dropdown.Menu>
          
          <Dropdown.Toggle onClick={() => { setCheckClickPath('/homeTop') }} className={checkClickPath === "/homeTop" ||checkClickPath === "/contact" || checkClickPath === "/about" || checkClickPath === "/about/policy" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            จัดการหน้าเว็บ
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/homeTop" ||checkClickPath === "/contact" || checkClickPath === "/about" || checkClickPath === "/about/policy"}>
          <Link
              id="buttons"
              href="/homeTop"
              className={asPath === "/homeTop" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              จัดการหลัก
            </Link>
          <Link
              id="buttons"
              href="/about"
              className={asPath === "/about" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              จัดการหน้าเกี่ยวกับเรา
            </Link>
            <Link
              id="buttons"
              href="/about/policy"
              className={asPath === "/about/policy" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              จัดการนโยบาย
            </Link>
            <Link
              id="buttons"
              href="/contact"
              className={asPath === "/contact" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              จัดการหน้าติดต่อ
            </Link>
          </Dropdown.Menu>


          <Dropdown.Toggle onClick={() => { setCheckClickPath('/products') }} className={checkClickPath === "/products" || checkClickPath === "/products/type" || checkClickPath === "/products/subType" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            จัดการสินค้า
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/products" || checkClickPath === "/products/type" || checkClickPath === "/products/subType"}>
            <Link
              id="buttons"
              href="/products"
              className={asPath === "/products" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
              สินค้า
              
            </Link>
            <Link
              id="buttons"
              href="/products/type"
              className={asPath === "/products/type" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
              ประเภทสินค้า
              
            </Link>
            <Link
              id="buttons"
              href="/products/subType"
              className={asPath === "/products/subType" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
              ประเภทย่อยสินค้า
              
            </Link>
          </Dropdown.Menu>

          <Dropdown.Toggle onClick={() => { setCheckClickPath('/orders') }} className={checkClickPath === "/orders" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
            <i className="me-2">
              <BsFillBagFill />
            </i>
            จัดการออเดอร์
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/orders"}>
            <Link
              id="buttons"
              href="/orders"
              className={asPath === "/orders" ? "dropdown-item ps-5 active" : "dropdown-item ps-5"}>
              
              รายการสั่งซื้อ
              
            </Link>
          </Dropdown.Menu>
        


        </div>
      </nav>
    </div>
  </>;
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
