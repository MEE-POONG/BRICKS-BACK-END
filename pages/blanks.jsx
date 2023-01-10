import Head from 'next/head';

import IndexPage from "components/layouts/IndexPage";


import { useRouter } from 'next/router';

import { Container, Image, Row } from 'react-bootstrap';
export default function BlankPage() {
  const router = useRouter();
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
        <Row className="vh-100 bg-secondary rounded align-items-center justify-content-center mx-0">
          <div className="col-md-6 text-center">
            <h3>This is blank page</h3>
          </div>
        </Row>
      </Container>
    </ >
  );
}
BlankPage.layout = IndexPage;