import { Component } from 'react';
import './cloudImage.scss'

export class CloudImage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <img
                src={`https://ce83c157c.cloudimg.io/width/800/png-lossy-40/${this.props.src}`}
                alt={this.props.alt}
            />
        );
    }
}

