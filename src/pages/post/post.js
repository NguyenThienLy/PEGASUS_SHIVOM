import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'


import { Header } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import './post.scss'

 class Post extends React.Component {
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
                    <title>Bài review</title>
                </Head>
                <Header {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Post);

