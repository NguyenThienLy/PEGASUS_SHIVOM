import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'

import Head from 'next/head'

import { Header } from '../../components'

import './home.scss'


import { crudApi } from '../../services'
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
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                  
                </Head>
                <Header />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Home);

