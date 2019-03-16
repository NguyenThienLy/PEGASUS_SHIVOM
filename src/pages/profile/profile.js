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
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                        crossorigin="anonymous"></script>
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                        crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                        crossorigin="anonymous"></script>
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

