import * as React from "react";
import "isomorphic-unfetch";
import { connect } from "react-redux";
import { Header, Headline, Footer } from "../../components";
import Head from "next/head";
import Link from "next/link";
import "./profile.scss";

import { Info } from "./components/info/info";
import { Editor } from "./components/editor/editor";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: true
    };
    this.handleClose = this.handleClose.bind(this);
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  async handleClose() {
    console.log("close");
    this.setState({ showEditor: false });
  }
  render() {
    return (
      <div>
        <Head>
          <title>Trang cá nhân</title>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossorigin="anonymous"
          />
        </Head>
        <Header {...this.props}/>
        <div className="profile-main">
          <div
            style={{
              height: "30px"
            }}
          />
          <Info />
          <div
            style={{
              height: "20px"
            }}
          />
          <Headline title="BÀI VIẾT REVIEW" />
          {this.state.showEditor ? (
            <Editor handleClose={this.handleClose} />
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Profile);
