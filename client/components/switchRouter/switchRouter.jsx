import * as React from "react";
import { Route } from 'react-router-dom'

export class SwitchRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null
        };
    }
    componentDidMount() {
        const pathname = window.location.pathname

        const route = this.props.routes.find((route) => { return route.path === pathname })
        if (route) {
            this.setState({ component: route.component })
        }
    }
    componentWillReceiveProps(nextProps) {

        const pathname = window.location.pathname
        const route = this.props.routes.find((route) => { return route.path === pathname })
        if (route) {
            this.setState({ component: route.component })
        }
    }
    shouldComponentUpdate() {
        return true
    }
    render() {
        if (this.state.component) {
            return (
                <div>
                    {this.state.component}
                    {/* <this.state.component /> */}
                </div>)
        } else {
            return (
                <div>

                </div>)
        }
    }
}
