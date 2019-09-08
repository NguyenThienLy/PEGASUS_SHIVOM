import { Component } from 'react';
import './alert.scss'

export class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warn: {
                icon: <i class="fas fa-exclamation"></i>,
            },
            success: {
                icon: <i class="fas fa-check"></i>,
            },
            error: {
                icon: <i class="fas fa-times"></i>
            }
        }
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="alert-wrapper">
                <div className="alert-wrapper__exit"><i class="fas fa-times"></i></div>
                <div className="alert-wrapper__icon alert-wrapper__icon--error">
                    <i class="fas fa-times"></i>
                </div>
                <div className="alert-wrapper__title">Are You Sure?</div>
                <div className="alert-wrapper__content">Do you really want to delete this </div>
                <div className="alert-wrapper__action">
                    <button className="alert-wrapper__action__button alert-wrapper__action__button--cancel">Cancel</button>
                    <button className="alert-wrapper__action__button alert-wrapper__action__button--error">Delete</button>
                </div>
            </div>
        )
    }
}

// success icon <i class="fas fa-check"></i>
// error icon <i class="fas fa-exclamation"></i>

