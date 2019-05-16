import * as React from 'react'

import { Header } from '../../components'

import Head from 'next/head'

import './contact.scss'


import GoogleMapReact from 'google-map-react';

export default class Contact extends React.Component {
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
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                        crossorigin="anonymous"></link>

                </Head>
                <Header {...this.props}/>
                <div className="contact">
                    {/* <div><h1 className="text-center contact-title">Liên hệ với chúng tôi</h1></div> */}
                    <div className="contact-container">
                        <div className="contact-form">
                            <div>
                                <input placeholder="Họ tên" />
                                <input placeholder="Số điện thoại" />
                            </div>
                            <div>
                                <input placeholder="Email" />
                                <input placeholder="Chủ đề" />
                            </div>
                            <div className="contact-form-message">
                                <textarea placeholder="Nội dung tin nhắn"></textarea>
                            </div>
                            <button>Gửi tin nhắn</button>
                        </div>
                        <div className="contact-info">
                            <h1 className="contact-title">PEGASUS TEAM</h1>
                            <div className="info-line">
                                <i class="fas fa-phone-square"></i>
                                <span className="contact-info-element">19006789</span>
                            </div>
                            <div className="info-line">
                                <i class="fas fa-envelope"></i>
                                <span className="contact-info-element">pegasus.tech.solution@gmail.com</span>
                            </div>
                            <div className="info-line">
                                <i class="fas fa-globe-africa"></i>
                                <span className="contact-info-element">Tầng 81 toà nhà Landmark</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyARRlQaEH15TgxFmDliRLH-NpQNAEqcJps" }}
                        defaultCenter={this.state.center}
                        defaultZoom={this.state.zoom}
                    />
                </div>
            </div>
        )
    }
}