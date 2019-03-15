import * as React from 'react'
import './headline.scss'

export class Headline extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        return (
            <div className="headline">
                <div className="headline-title">{this.props.title}</div>
            </div>
        )
    }
}

