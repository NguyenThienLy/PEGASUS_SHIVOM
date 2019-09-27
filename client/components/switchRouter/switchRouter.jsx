import * as React from "react";
import { Route } from 'react-router-dom'
import * as _ from 'lodash'

export class SwitchRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,

        };
        this.renderComponent = this.renderComponent.bind(this)
    }
    renderComponent() {
        const pathname = window.location.pathname
        let params = {}
        let route = this.props.routes.find((route) => {
            let reg = /\:\w+/
            const aPaths = route.path.split("/")
            const bPaths = pathname.split("/")
            if (aPaths.length !== bPaths.length) {
                return false
            }
            for (const pathIndex in aPaths) {
                if (reg.test(aPaths[pathIndex])) {
                    params[aPaths[pathIndex].slice(1, aPaths[pathIndex].length)] = bPaths[pathIndex]
                    continue
                }
                else if (aPaths[pathIndex] !== bPaths[pathIndex]) {
                    return false
                }
            }
            return true
        })
        if (route) {
            let child = React.cloneElement(route.component, { params: params })
            this.setState({ component: child })
        }
    }
    componentDidMount() {
        this.renderComponent()
    }
    componentWillReceiveProps(nextProps) {
        this.renderComponent()
    }
    shouldComponentUpdate() {
        return true
    }
    render() {
        if (this.state.component) {
            return (
                <div>
                    {this.state.component}
                </div>)
        } else {
            return (
                <div>

                </div>)
        }
    }
}
