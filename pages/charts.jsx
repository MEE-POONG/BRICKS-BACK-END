import Head from 'next/head';

import IndexPage from "components/layouts/IndexPage";


import { useRouter } from 'next/router';

import { Container, Image, Row } from 'react-bootstrap';
export default function ChartPage() {
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
        <Row className=" g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Single Line Chart</h6>
              <canvas id="line-chart"></canvas>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Multiple Line Chart</h6>
              <canvas id="salse-revenue"></canvas>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Single Bar Chart</h6>
              <canvas id="bar-chart"></canvas>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Multiple Bar Chart</h6>
              <canvas id="worldwide-sales"></canvas>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Pie Chart</h6>
              <canvas id="pie-chart"></canvas>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Doughnut Chart</h6>
              <canvas id="doughnut-chart"></canvas>
            </div>
          </div>
        </Row>
      </Container>
    </ >
  );
}
ChartPage.layout = IndexPage;