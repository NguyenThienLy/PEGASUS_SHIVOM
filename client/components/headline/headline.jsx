import * as React from 'react'
import './headline.scss'

export class Headline extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, switchPage = false } = this.props
        return (
            <div className="headline">
                <div className="headline-title">{title}</div>
                {switchPage ? <div className="headline-switch">
                    <div id="prev">&lt;</div>
                    <div id="next">&gt;</div>
                </div> : null}
            </div>
        )
    }
}

