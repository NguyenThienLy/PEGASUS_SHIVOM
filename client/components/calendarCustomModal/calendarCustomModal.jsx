import * as React from "react";
import { Modal } from "../../modals";
import DayPicker, { DateUtils } from "react-day-picker";

export class CalendarCustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  closeModal() {
    this.props.hideModal();
  }

  render() {
    // Chưa có hệ thống web
    const { show, arrTime } = this.props;

    //console.log("arrTime", arrTime);
    return (
      <section>
        <Modal
          visible={show}
          width="350"
          height="auto"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <DayPicker selectedDays={arrTime} />
          </div>
          {/* <InfiniteCalendar
            //Component={withMultipleDates(Calendar)}
            width={400}
            selected={[new Date(2019, 9, 7), new Date(), new Date(2019, 9, 24)]}
            //disabledDays={[0, 6]}
            min={new Date(2019, 8, 15)}
            minDate={new Date(2019, 8, 16)}
            theme={{
              selectionColor: "#00a3af",
              textColor: {
                default: "#333",
                active: "#FFF"
              },
              weekdayColor: "#00a3af",
              headerColor: "#a0c6c8",
              floatingNav: {
                background: "#83ccd2",
                color: "#FFF",
                chevron: "#FFA726"
              }
            }}
            //interpolateSelection={defaultMultipleDateInterpolation}
          /> */}
        </Modal>
      </section>
    );
  }
}
