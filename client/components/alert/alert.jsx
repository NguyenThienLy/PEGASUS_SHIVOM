import { Component } from 'react';
import './alert.scss'

export class Alert extends Component {
    constructor(props) {
        super(props);
        this.checkType = this.checkType.bind(this);
        this.state = {
            warn: {
                icon: <i class="fas fa-exclamation"></i>,
                title: 'Are You Sure?',
                content: 'Do you really want to delete this'
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
    checkType() {
        const type = this.props.type;
        switch (type) {
            case 'warn':
                {
                    return this.state.warn;
                }
            case 'success':
                return this.state.success;
            case 'error':
                return this.state.error;
            default:
                return null;
        }
    }

    render() {
        const type = this.checkType();
        return (
            <div className="alert-wrapper">
                <div className="alert-wrapper__exit"><i class="fas fa-times"></i></div>
                <div className="alert-wrapper__icon alert-wrapper__icon--error">
                    {type.icon}
                </div>
                <div className="alert-wrapper__title">{type.title}</div>
                <div className="alert-wrapper__content">{type.content}</div>
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

