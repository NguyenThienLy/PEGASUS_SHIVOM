import * as React from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux'
import { api } from '../../services'
import { action } from '../../actions'

import './contact.scss'
import { Header, Footer } from '../../components'
import GoogleMapReact from 'google-map-react';

export class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33,
            },
            zoom: 11
        }
            
    }
    static async  getInitialProps({ req, query }) {
        return {

        }
    }
    render() {
        return (
            <div>
                <Head>
                    <title>Liên hệ</title>
                    <meta name="title" content="Liên hệ" />
                    <meta name="description" content="Liên hệ công ty công nghệ Pegasus" />
                </Head>
                <Header {...this.props}/>
                <React.Fragment>
                <div className="body">
                <div>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyARRlQaEH15TgxFmDliRLH-NpQNAEqcJps" }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    />
                </div>
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
  
  export default connect(mapStateToProps)(Contact);
