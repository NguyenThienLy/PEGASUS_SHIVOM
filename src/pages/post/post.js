import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'

import Head from 'next/head'


import './post.scss'

export default class Post extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        console.log("req: ", req)
        return {

        }
    }
    render() {
        
        return (
            <div>
                <Head>
                    <title>Bài review</title>
                </Head>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Home);

