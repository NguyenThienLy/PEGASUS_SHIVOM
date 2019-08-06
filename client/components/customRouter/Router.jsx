

import * as React from 'react'

export class CustomRouter extends React.Component {
    constructor() {
        super();
    }
    // openChildComponent(path) {

    // }
    // renderChild() {
    //     for (const component of this.state.components) {
    //         if (component.isShow) {

    //         }
    //     }
    // }
    componentWillMount() {

    }

    render() {
        const { routes, path } = this.props
        return (
            <div>
                {
                    routes.map((prop, key) => {
                        return (
                            prop.path === path ? <prop.component {...prop.props} key={key}/> : null
                        );
                    })
                }
            </div>
        )
    }

}
