import * as React from "react";
import { Route } from 'react-router-dom'

export class SwitchRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,
            isLoaded: false
        };
    }
    componentDidMount() {
        const pathname = window.location.pathname

        const route = this.props.routes.find((route) => { return route.path === pathname })
        if (route) {
            this.setState({ component: route.component, isLoaded: true })
        }
    }
    componentWillReceiveProps(nextProps) {
        const pathname = window.location.pathname
        const route = this.props.routes.find((route) => { return route.path === pathname })
        if (route) {
            this.setState({ component: route.component, isLoaded: true })
        }
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
