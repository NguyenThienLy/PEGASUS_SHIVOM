import * as React from 'react'
import './loading.scss'

export class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="loading">
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> 
            </div>
        )
    }
}

