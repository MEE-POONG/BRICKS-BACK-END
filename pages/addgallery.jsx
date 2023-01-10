import React from "react";
import { Row, Col, Card, Button, Image } from "react-bootstrap";
import { BiX } from "react-icons/bi";
// import defaultImage from "../assets/img/default.jpg";
// import {GalleryArray}f rom "../pages/users/UsersData";

function getUrlParam(paramName) {
  // console.log("Test", paramName);

  // var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
  var reParam = new RegExp("(?:[?&]|&)" + paramName + "=([^&]+)", "i");
  var match = window.location.href.match(reParam);
  // console.log(window.location);
  // console.log(match);

  return match && match.length > 1 ? match[1] : null;
}

function returnFileUrl(url) {
  // console.log(url);

  // console.log('this is:', this);
  var funcNum = getUrlParam("CKEditorFuncNum");
  var fileUrl = url;
  // console.log(window.opener);
  window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl, function () {
    // --------Get the reference to a dialog window.
    var dialog = this.getDialog();
    // --------Check if this is the Image Properties dialog window.
    if (dialog.getName() === "image") {
      // --------Get the reference to a text field that stores the "alt" attribute.
      var element = dialog.getContentElement("info", "txtAlt");
      // --------Assign the new value.
      if (element) element.setValue("alt text");
    }
    // Return "false" to stop further execution. In such case CKEditor will ignore the second argument ("fileUrl")
    // and the "onSelect" function assigned to the button that called the file manager (if defined).
    // return false;
  });
  // console.log(fileUrl);
  // console.log(funcNum);
  // console.log(window.opener);
  window.close();
}
export default function AddGallery() {
  return (
    <div className="mx-5">
      <Card className="gallery">
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md="4">
              <Image
                onClick={() => returnFileUrl(defaultImage)}
                src={'/./images/testimonial-1.jpg'}
              />
            </Col>
            {/* {GalleryArray.map((GalleryArray, key) => {
              return (
                <Col xs={6} md={4} key={key}>
                  <Button className="btn-close">
                    <BiX />
                  </Button>
                  <Button variant="link" className="btn-gallery">
                    <Image
                      onClick={() => returnFileUrl(defaultImage)}
                      src={GalleryArray.img ? defaultImage : defaultImage}
                    />
                  </Button>
                </Col>
              );
            })} */}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}