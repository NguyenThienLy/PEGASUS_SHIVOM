import * as React from 'react'
import { connect } from 'react-redux'

import { Header, Footer } from '../components'

import Head from 'next/head'

class Home extends React.Component {
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
                    <title>Trang chủ</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Header/>
                <Footer/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Home);
