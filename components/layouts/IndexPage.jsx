import IndexNavbar from "components/Navbars/IndexNavbar";
import Footer from "../Footers/Footer";
import { Container } from 'react-bootstrap';
import { FaArrowUp } from "react-icons/fa";
import TheSlideNav from "../Sidebar/TheSlideNav";

export default function Layout({ children }) {
  return (
    <>
      <TheSlideNav />
      <div className="content">
      <div className="background bgsize "></div>
        <IndexNavbar />
        {children}
        <Footer />
      </div>
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <FaArrowUp />
      </a>
    </>
  );
}
