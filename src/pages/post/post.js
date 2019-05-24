import * as React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'
import './post.scss'

import { connect } from 'react-redux'
import { api } from '../../services'
import { Header } from '../../components'



class Post extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        const slug = req.params.postId
        const posts = await api.post.getList({ query: { fields: ["$all"], filter: { slug: slug } } })
        return {
            post: posts[0]
        }
    }
    render() {

        return (
            <div>
                <Head>
                    <title>{this.props.post.title}</title>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous" />
                </Head>
                <Header {...this.props} />
                <div className="post-body">
                    <p>{this.props.post.content}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Post);

