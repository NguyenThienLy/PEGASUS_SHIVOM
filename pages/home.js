import * as React from 'react'

export default class Home extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        console.log("props: ", this.props)
        return (
            <div>Home</div>
        )
    }
}