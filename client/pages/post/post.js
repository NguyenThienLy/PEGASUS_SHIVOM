import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions';

import './post.scss'
import { Header, Footer } from '../../components'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    static async getInitialProps({ req, query }) {
        return {

        }
    }

    async componentDidMount() {
        
    }
    
    render() {

        return (
            <div>
                <Head>
                    <title>Bài viết chi tiết</title>
                    <meta name="title" content="Bài viết" />
                    <meta name="description" content="Chi tiết bài viết" />
                </Head>
                <Header {...this.props} />
                <React.Fragment>
                <div className="body">
                        <h1>Bài viết</h1>
                    </div>
                </React.Fragment>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Post);

