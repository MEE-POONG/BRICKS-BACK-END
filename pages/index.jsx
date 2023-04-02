import Head from 'next/head';
import IndexPage from "components/layouts/IndexPage";
import { Card, Table } from 'react-bootstrap';
import Warn from 'container/home/warn';
import Widget from '@/container/Dashboard/widget';
import SearchOrders from './orders';
// import Calendars from '@/container/Dashboard/Calender';
export default function HomePage() {

  return (
    < >
      <Head>
        <title>ช่างพอง อิฐประสาน</title>
        <meta name="description" content="I2AROBOT 2" />
        <link rel="icon" href="" />
      </Head>
      <SearchOrders />
      <div>
        {/* <Widget/> */}
      </div>
      <div>
        {/* <Calendars/> */}
      </div>

    </ >
  );
}
HomePage.layout = IndexPage;