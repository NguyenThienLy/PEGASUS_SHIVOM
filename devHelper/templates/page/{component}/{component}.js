import * as React from 'react'
import 'isomorphic-unfetch'
import { connect } from 'react-redux'
import Head from 'next/head'
import './{name}.scss'

import { Header } from '../../components'

class {Name} extends React.Component {
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
                    <title>{Name}</title>
                   
                </Head>
                <Header />
                <div className="{name}-body">
                  
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Books);

