import * as React from 'react'


export class Test extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("props của header: ", this.props)
        return (
            <div className="header">
                Bài viết của tôi
                {this.props.children}
            </div>
        )
    }
}

