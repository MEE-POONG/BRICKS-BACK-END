import React from "react";
import Head from "next/head";
import App from "next/app";
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'assets/scss/index.scss';
export default class MyApp extends App {
  
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <SSRProvider>
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>ช่างพอง อิฐประสาน</title>
            <link rel="icon" href="/images/logo1.png" />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Fragment>
      </SSRProvider>
    );
  }
}
