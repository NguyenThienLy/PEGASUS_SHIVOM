import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'
import { Header } from '../../components'
import Head from 'next/head'
import Link from 'next/link'
import './posts.scss'

 class Posts extends React.Component {
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
                    <title>Danh sách bài viết</title>
                </Head>
                <Header {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(Posts);

