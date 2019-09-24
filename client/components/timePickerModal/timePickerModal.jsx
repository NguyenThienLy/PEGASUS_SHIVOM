import React, { Component } from "react";
import "./timePickerModal.scss";
import { Modal } from "../../modals";

import TimeKeeper from 'react-timekeeper';

export class TimePickerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    componentDidMount() { }

    closeModal() {
        this.props.hideModal(this.props.varName);
    }

    render() {
        const { show } = this.props;
        return (
            <section>
                <Modal
                    visible={show}
                    width="auto"
                    height="auto"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <TimeKeeper
                        time={this.props.time}
                        onChange={(time) => { return this.props.handleTimeChange(this.props.varName, time) }}
                        onDoneClick={() => {
                            this.closeModal()
                        }}
                        switchToMinuteOnHourSelect={true}
                    />
                </Modal>
            </section>
        );
    }
}
