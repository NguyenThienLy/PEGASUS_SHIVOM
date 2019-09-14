import * as React from "react";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css"; // only needs to be imported once

export class CalendarCustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    (
      <InfiniteCalendar
        width={400}
        height={600}
        selected={today}
        disabledDays={[0, 6]}
        minDate={lastWeek}
      />
    ),
      document.getElementById("root");
  }
}
