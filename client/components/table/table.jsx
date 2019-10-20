import * as React from "react";
import "./table.scss";
import { CalendarCustomModal } from "../calendarCustomModal/calendarCustomModal";
import moment from "moment";
import Router from 'next/router';
import { Loading } from "../../components";
import { Tooltip } from 'react-tippy';

export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarModal: {
        isShow: false,
        arrTime: []
      }
    };

    this.hideCalendarModal = this.hideCalendarModal.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.searchInTableFollowName = this.searchInTableFollowName.bind(this);
  }

  hideCalendarModal() {
    this.setState({ calendarModal: { isShow: false } });
  }

  showCalendar(times) {
    let tempCalendarModal = {
      isShow: true,
      arrTime: []
    };

    times.forEach(element => {
      tempCalendarModal.arrTime.push(
        new Date(
          moment(element.time).year(),
          moment(element.time).month(),
          moment(element.time).date()
        )
      );
    });

    this.setState({ calendarModal: tempCalendarModal });
  }

  openStudentDetail(studentId) {
    Router.push(
      `/manager/member/member?studentId=${studentId}`,
      `/quan-ly/hoc-vien/chi-tiet/${studentId}`
    );
  }

  searchInTableFollowName(formatKey) {
    console.log("content", formatKey)
  }

  render() {
    const { tableContents, isFetching, isEmpty } = this.props;

    return (
      <div className="table">
        <CalendarCustomModal
          show={this.state.calendarModal.isShow}
          hideModal={this.hideCalendarModal}
          arrTime={this.state.calendarModal.arrTime}
        />
        <div className="table__title">
          <div className="table__title__icon">
            <i className="fas fa-clipboard-list" />
          </div>
          <div className="table__title__content">{tableContents.nameTable}</div>
        </div>
        <div className="table__content">

          <div><input
            className="table__content__search-input"
            type="text"
            laceholder="Tìm kiếm theo tên"
            onChange={() => { this.searchInTableFollowName(tableContents.formatKey) }}
          /></div>

          <table>
            <colgroup>
              <col className="table__content__firstCol" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Sdt</th>
                <th>Sn đã học</th>
                <th>Sn vắng</th>
                <th className="table__content__right">Tác vụ</th>
              </tr>
            </thead>
            {isFetching && isEmpty && <Loading />}
            {isEmpty && !isFetching && "Dữ liệu trống"}
            {!isFetching && !isEmpty && (
              <tbody>
                {tableContents.data &&
                  tableContents.data.map((tableContent, index) => {
                    return (
                      <tr key={index}>
                        <td data-title="#">{index + 1}</td>
                        <td data-title="Ảnh đại diện">
                          <img
                            style={{ width: "3em", height: "3em" }}
                            src={tableContent.students_docs[0].avatar}
                          ></img>
                        </td>
                        <td data-title="Tên học viên">
                          {tableContent.students_docs[0].firstName}&nbsp;
                          {tableContent.students_docs[0].lastName}
                        </td>
                        <td data-title="Sdt">
                          {tableContent.students_docs[0].phone}
                        </td>
                        <td data-title="Sn đã học">
                          {tableContent.coursesStudents_docs[0].totalLessonUsed}
                        </td>
                        <td data-title="Sn vắng">
                          {tableContent.coursesStudents_docs[0].totalAbsent}
                        </td>
                        <td data-title="Tác vụ" className="table__content__right">
                          <button
                            type="button"
                            className="table__content__btn table__content__btn--primary"
                            onClick={() => {
                              this.showCalendar(tableContent[tableContents.formatKey]);
                            }}
                          >
                            <i class="far fa-calendar-alt"></i>
                          </button>

                          <button
                            type="button"
                            className="table__content__btn table__content__btn--success"
                            onClick={() => {
                              this.openStudentDetail(tableContent.student);
                            }}
                          >

                            <i class="fas fa-external-link-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}
