

import * as React from 'react'

export class CustomLink extends React.Component {
    constructor() {
        super();
        this.showComponentOfRoute = this.showComponentOfRoute.bind(this)
    }

    showComponentOfRoute(){

    }
    componentWillMount() {

    }

    render() {
        const { route, changePath } = this.props
        return (
            <div onClick={changePath}>
                {this.props.children}
            </div>
        )
    }

}
