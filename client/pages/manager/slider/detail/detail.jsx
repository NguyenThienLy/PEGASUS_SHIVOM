import * as React from "react";

import { action } from '../../../../actions'
import { api } from '../../../../services'

export class DetailSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slider: {
                option: {}
            }
        }
    }

    async componentDidMount() {
        let slider = this.props.sliders.items.find((slider) => { return slider._id === this.props.params.sliderId })
        if (!slider) {
            const res = await api.slider.getItem(this.props.params.sliderId)
            slider = res.result.object
        }
        this.setState({ slider: slider })
    }
    render() {

        return (
            <div>
                <h1>{this.state.slider.option.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.state.slider.option.description }}></div>
            </div>

        );
    }
}
