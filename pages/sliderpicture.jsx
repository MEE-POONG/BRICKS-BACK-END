import Head from 'next/head';
import { useState , useEffect } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge,Modal,Row } from 'react-bootstrap';
import Editor from '@/components/Ckeditor/Editor';
export default function SliderpicturePage() {
  
 // ----ing-----
 const [image, setImage] = useState([])
 const [imageURL, setImageURL] = useState([])

 useEffect(() => {

     if (image.length < 1) return
     const newImageUrl = []
     image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
     setImageURL(newImageUrl)
 }, [image])

 const onImageProductChange = (e) => {
     setImage([...e.target.files])
 }

 const router = useRouter();
 return (
     < >
         <Head>
             <title>Pig Jungle</title>
             <meta
                 name="description"
                 content="I2AROBOT 2"
             />
             <link rel="icon" href="/favicon.ico" />
         </Head>
         <Container fluid className=" pt-4 px-4">
             <Row className=" g-4">

                 <div className="bg-secondary rounded p-4">

                     <h6 className="mb-4"> ข้อมูลร้าน </h6>
                     <form>
                         <div className="mb-3">
                             <label for="Inputname" className="form-label">รูปภาพของร้าน</label><br />
                             {imageURL.map(imageSrcProduct => <Image className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                             <input type="file" accept="image/*" onChange={onImageProductChange} className="form-control" id="#" placeholder='' />
                             <div className="mb-3">
                                 <label for="Inputphone" className="form-label">รายละเอียดร้าน</label>
                                 <Editor/>
                             </div>
                         </div>

                         <button type="submit" className="btn btn-success"  >ยืนยัน</button>
                     </form>
                 </div>

                 <div className="bg-secondary rounded p-4">
                     <h6 className="mb-4"> ข้อมูลเจ้าของร้าน </h6>
                     <form>
                         <div className="mb-3">
                             <label for="Inputname" className="form-label">รูปภาพของร้าน</label>
                             <input type="file" className="form-control" id="#" placeholder='' />
                         </div>
                         <div className="mb-3">
                             <label for="Inputphone" className="form-label">รายละเอียดรูปภาพของร้าน</label>
                             <Editor/>
                         </div>

                         <button type="submit" className="btn btn-success"  >ยืนยัน</button>
                     </form>
                 </div>
             </Row>


         </Container>
     </ >
 );
}
SliderpicturePage.layout = IndexPage;