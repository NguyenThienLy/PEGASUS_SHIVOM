import React, { Component } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions'

import './project.scss'
import { Header, Footer } from '../../components/'

class Project extends Component {
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
                    <title>Dự án</title>
                    <meta name="title" content="Dự án tại Pegasus" />
                    <meta name="description" content="Các dự án của Pegasus" />
                </Head>
                <Header {...this.props} />
                <React.Fragment>
                <div className="body">
                        <h1>Các dự án tại Pegasus</h1>
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

export default connect(mapStateToProps)(Project);
