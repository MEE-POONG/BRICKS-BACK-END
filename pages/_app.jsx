import React from "react";
import Head from "next/head";
import ReactDOMClient from "react-dom/client"; // Import the ReactDOMClient package
import Router from "next/router";
import PageChange from "../components/PageChange/PageChange";
import App from "next/app";
import SSRProvider from 'react-bootstrap/SSRProvider';
import 'assets/scss/index.scss';
// Router.events.on("routeChangeStart", (url) => {
//   const root = ReactDOMClient.createRoot(document.getElementById("page-transition"));
//   document.body.classList.add("body-page-transition");
//   root.render(<PageChange path={url} />);
// });
// Router.events.on("routeChangeComplete", () => {
//   const root = ReactDOMClient.createRoot(document.getElementById("page-transition"));
//   root.unmount();
//   document.body.classList.remove("body-page-transition");
// });
// Router.events.on("routeChangeError", () => {
//   const root = ReactDOMClient.createRoot(document.getElementById("page-transition"));
//   root.unmount();
//   document.body.classList.remove("body-page-transition");
// });
export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
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
            <title>Notus NextJS by Creative Tim</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Fragment>
      </SSRProvider>
    );
  }
}
