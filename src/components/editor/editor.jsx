import * as React from 'react'
import './editor.scss'

import { BaseModal } from '../../modals'

export class Editor extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BaseModal show={true} handleClose={this.props.handleClose} style={{ height: "1000px", width: "700px" }}>
                <div>Viết bài nào</div>
            </BaseModal>
        )
    }
}

