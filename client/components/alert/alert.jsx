import { Component } from 'react';
import './alert.scss'

export class Alert extends Component {
    constructor(props) {
        super(props);
        this.checkType = this.checkType.bind(this);
        this.state = {
            warn: {
                typeCss: 'warn',
                icon: <i class="fas fa-exclamation"></i>,
                title: 'Are You Sure?',
                content: 'Do you really want to delete this',
                button: 'Cancel'
            },
            success: {
                typeCss: 'success',
                icon: <i class="fas fa-check"></i>,
                title: 'Success',
                content: 'This is acceptable',
                button: 'OK'
            },
            error: {
                typeCss: 'error',
                icon: <i class="fas fa-times"></i>,
                title: 'Error',
                content: 'This is unacceptable',
                button: 'Cancel'
            }
        }
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
    checkType() {
        switch (this.props.type) {
            case 'warn':
                return this.state.warn;
            case 'success':
                return this.state.success;
            case 'error':
                return this.state.error;
            default:
                return null;
        }
    }

    render() {
        const typeOfBtn = this.checkType();
        console.log(typeOfBtn.typeCss);
        console.log(`this is type:  ${typeOfBtn.typeCss}`)
        return (
            <div className="alert-wrapper" >

                <div className="alert-wrapper__exit"><i class="fas fa-times"></i></div>
                <div className={`alert-wrapper__icon alert-wrapper__icon--${typeOfBtn.typeCss}`}>
                    {typeOfBtn.icon}
                </div>
                <div className="alert-wrapper__title">{typeOfBtn.title}</div>
                <div className="alert-wrapper__content">{typeOfBtn.content}</div>
                <div className="alert-wrapper__action">
                    {
                        (typeOfBtn.typeCss == 'success') ? null : <button className="alert-wrapper__action__button alert-wrapper__action__button--cancel">Cancel</button>
                    }

                    <button className={`alert-wrapper__action__button alert-wrapper__action__button--${typeOfBtn.typeCss}`}>{typeOfBtn.button}</button>
                </div>
            </div>
        )
    }
}

// success icon <i class="fas fa-check"></i>
// error icon <i class="fas fa-exclamation"></i>
//className={`alert-wrapper__action__button alert-wrapper__action__button--cancel ${}`}>


