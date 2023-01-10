import Head from 'next/head';
import { useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge } from 'react-bootstrap';
import { FaTimes, FaEye, FaEdit, FaHandHoldingUsd, FaReply } from 'react-icons/fa';
export default function OrderDetailPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  // const createClose = () => setShow(false);
  const createShow = () => setShow(true);
  return (
    < >
      <Head>
        <title>HOME | dxx=</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        
      </Container>
    </ >
  );
}
OrderDetailPage.layout = IndexPage;