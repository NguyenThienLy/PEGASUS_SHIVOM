import * as React from 'react'

import { Header } from '../components'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log("props: ", this.props)
        return (
            <div>
                <Header />
                <div>Trang chủ</div>
            </div>
        )
    }
}