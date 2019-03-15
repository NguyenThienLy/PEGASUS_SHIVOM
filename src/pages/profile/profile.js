import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'
import { Header, Headline } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import './profile.scss'

import { Info } from './components/info/info'

 class Profile extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        return {
            
        }
    }
    render() {
  
        return (
            <div>
                <Head>
                    <title>Trang cá nhân</title>
                </Head>
                <Header/>
                <div style={
                    {
                        height: "30px"
                    }
                }></div>
                <Info />
                <div style={
                    {
                        height: "20px"
                    }
                }></div>
                <Headline title="BÀI VIẾT REVIEW"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Profile);

