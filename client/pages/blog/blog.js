import React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import { Header, Footer } from "../../components";
import "./blog.scss";

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  render() {
    return (
      <div>
        <Head>
          <title>Blog</title>
          <meta name="title" content="Blog" />
          <meta name="description" content="Blog công ty công nghệ Pegasus" />
        </Head>
        <Header {...this.props} />
        <React.Fragment>
          <div className="body">
            <h1>Giới thiệu team Pegasus</h1>
          </div>
        </React.Fragment>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Blog);
