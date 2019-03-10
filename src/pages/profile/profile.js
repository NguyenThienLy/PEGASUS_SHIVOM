import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'
import { Header } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import './profile.scss'

 class Profile extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        return {
            postId: req.params.postId
        }
    }
    render() {
  
        return (
            <div>
                <Head>
                    <title>Trang cá nhân</title>
                </Head>
                <Header/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Profile);

