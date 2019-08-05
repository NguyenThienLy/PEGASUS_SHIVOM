import { Component } from 'react';
import './componentLoading.scss'

export class ComponentLoading extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        
    }

    componentWillUnmount() {
       
    }
    render() {
        return (
            <div class="box-loading" style={this.props.style}>
                <div class="box-thumbnail"></div>

                <div class="box-line-sm"></div>
                <div class="box-line-xs"></div>

                <div class="box-line-df"></div>
                <div class="box-line-lgx"></div>
                <div class="box-line-lg"></div>
            </div>
        )
    }
}

