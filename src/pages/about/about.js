import React, { Component } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions'

import './about.scss'
import { Header, Footer } from '../../components/'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
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
                    <title>Giới thiệu</title>
                    <meta name="title" content="Giới thiệu Pegasus" />
                    <meta name="description" content="Công ty công nghệ Pegasus" />
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

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(About);
