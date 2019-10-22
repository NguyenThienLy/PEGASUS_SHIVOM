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
      },
      tableContents: {
        data: this.props.tableContents,
        isFetching: this.props.isFetching,
        isEmpty: this.props.isEmpty
      },
      statisticDataTable: null
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
    if (formatKey === this.state.tableContents.data.formatKey) {
      const newTableContents = this.state.tableContents;
      // Gán để lấy lại dữ liệu đầy đủ truyền vào
      let dataFilter = this.state.statisticDataTable

      if (this.refs.searchFollowName.value.length > 0) {
        newTableContents.data.data = dataFilter.filter((student) => {
          return student.students_docs[0].lastName.indexOf(this.refs.searchFollowName.value) !== -1;
        })

        if (newTableContents.data.data.length === 0)
          newTableContents.isEmpty = true;
        else
          newTableContents.isEmpty = false;
      }
      else {
        newTableContents.data.data = this.state.statisticDataTable
        newTableContents.isEmpty = false;
      }

      this.setState({ tableContents: newTableContents })
    }
  }

  componentDidMount() {
    const newTableContents = this.state.tableContents;

    newTableContents.isFetching = true;

    this.setState({ tableContents: newTableContents })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFetching && !this.props.isFetching) {

      const newTableContents = this.state.tableContents;

      newTableContents.data = this.props.tableContents;
      newTableContents.isFetching = this.props.isFetching;
      newTableContents.isEmpty = this.props.isEmpty;

      this.setState({
        tableContents: newTableContents,
        statisticDataTable: newTableContents.data.data
      })

    }
  }

  render() {
    // const { tableContents, isFetching, isEmpty } = this.props;

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
          <div className="table__title__content">{this.state.tableContents.data.nameTable}</div>
        </div>
        <div className="table__content">

          <div><input
            className="table__content__search-input"
            type="text"
            laceholder="Tìm kiếm theo tên"
            ref="searchFollowName"
            onChange={() => { this.searchInTableFollowName(this.state.tableContents.data.formatKey) }}
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
            {this.state.tableContents.isFetching && <Loading />}
            {this.state.tableContents.isEmpty && !this.state.tableContents.isFetching && "Dữ liệu trống"}
            {!this.state.tableContents.isFetching && !this.state.tableContents.isEmpty && (
              <tbody>
                {
                  this.state.tableContents.data.data.map((tableContent, index) => {
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
                              this.showCalendar(tableContent[this.state.tableContents.data.formatKey]);
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
