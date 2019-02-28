import * as React from 'react'

import './header.scss'

export class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("props của header: ", this.props)
        return (
            <div className="header">
                
                <div className="logo">Review</div>
                
                <div className="search">
                    <form>
                        <input placeholder="Tìm kiếm"></input>
                    </form>
                </div>

            </div>
        )
    }
}

