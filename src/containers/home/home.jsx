import * as React from 'react'

import { Header, PostGeneral } from '../../components'
import { Slide } from '../../components'
export class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            a: 1
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.name !== this.props.name) {
            return true
        }
        return false
    }
    render() {
        console.log("props của home ", this.props)
        return (
            <div>
                <Header {...this.props} {...this.state}/>
                {/* <h1>Hello </h1> */}
                
                <div>
                    <div className="container">
                    <h1>Trang chủ</h1>
                    </div>
                    
                </div>
            </div>
        )
    }
}

