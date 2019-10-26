import * as React from 'react';
import './table.scss';
import { CalendarCustomModal } from '../calendarCustomModal/calendarCustomModal';
import moment from 'moment';
import Router from 'next/router';
import { Loading } from '../../components';
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
      let dataFilter = this.state.statisticDataTable;

      if (this.refs.searchFollowName.value.length > 0) {
        newTableContents.data.data = dataFilter.filter(student => {
          const searchWordArr = this.refs.searchFollowName.value
            .trim()
            .split(' ');
          let formattedSearchValue = '';
          searchWordArr.forEach(word => {
            word = word.charAt(0).toUpperCase() + word.slice(1) + ' ';
            formattedSearchValue = formattedSearchValue.concat(word);
          });
          formattedSearchValue = formattedSearchValue.trim();
          return (
            student.students_docs[0].lastName.indexOf(formattedSearchValue) !==
            -1
          );
        });

        if (newTableContents.data.data.length === 0)
          newTableContents.isEmpty = true;
        else newTableContents.isEmpty = false;
      } else {
        newTableContents.data.data = this.state.statisticDataTable;
        newTableContents.isEmpty = false;
      }

      this.setState({ tableContents: newTableContents });
    }
  }

  componentDidMount() {
    const newTableContents = this.state.tableContents;

    newTableContents.isFetching = true;

    this.setState({ tableContents: newTableContents });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFetching && !this.props.isFetching) {
      const newTableContents = prevState.tableContents;

      newTableContents.data = this.props.tableContents;
      newTableContents.isFetching = this.props.isFetching;
      newTableContents.isEmpty = this.props.isEmpty;

      this.setState({
        tableContents: newTableContents,
        statisticDataTable: newTableContents.data.data
      });
    }
  }

  render() {
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

          <div className="table__title__content">
            <div className="table__title__content__name">
              {this.state.tableContents.data.nameTable}
            </div>
            <input
              className="table__title__content__search-input"
              type="text"
              placeholder="Tìm kiếm theo tên"
              ref="searchFollowName"
              onChange={() => {
                this.searchInTableFollowName(
                  this.state.tableContents.data.formatKey
                );
              }}
            />
          </div>
        </div>
        <div className="table__content">
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
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '15%' }}>Ảnh</th>
                <th style={{ width: '20%' }}>Tên</th>
                <th>Sdt</th>
                <th>Sn đã học</th>
                <th>Sn vắng</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            {this.state.tableContents.isFetching && <Loading />}
            {this.state.tableContents.isEmpty &&
              !this.state.tableContents.isFetching &&
              'Dữ liệu trống'}
            {!this.state.tableContents.isFetching &&
              !this.state.tableContents.isEmpty && (
                <tbody>
                  {this.state.tableContents.data.data.map(
                    (tableContent, index) => {
                      return (
                        <tr key={index}>
                          <td data-title="#" style={{ width: '5%' }}>
                            {index + 1}
                          </td>
                          <td
                            data-title="Ảnh đại diện"
                            style={{ width: '15%' }}
                          >
                            <img
                              alt=""
                              style={{ width: '100%', height: 'auto' }}
                              src={tableContent.students_docs[0].avatar}
                            ></img>
                          </td>
                          <td
                            data-title="Tên học viên"
                            style={{ width: '20%' }}
                          >
                            {tableContent.students_docs[0].firstName}&nbsp;
                            {tableContent.students_docs[0].lastName}
                          </td>
                          <td data-title="Sdt">
                            {tableContent.students_docs[0].phone}
                          </td>
                          <td data-title="Sn đã học">
                            {
                              tableContent.coursesStudents_docs[0]
                                .totalLessonUsed
                            }
                          </td>
                          <td data-title="Sn vắng">
                            {tableContent.coursesStudents_docs[0].totalAbsent}
                          </td>
                          <td data-title="Tác vụ">
                            <div className="action-td">
                              <Tooltip
                                title="Lịch học"
                                position="top"
                                className="action-td__item"
                              >
                                <span
                                  onClick={() => {
                                    this.showCalendar(
                                      tableContent[
                                        this.state.tableContents.data.formatKey
                                      ]
                                    );
                                  }}
                                >
                                  <i class="far fa-calendar-alt"></i>
                                </span>
                              </Tooltip>

                              <Tooltip
                                title="Chi tiết"
                                position="top"
                                className="action-td__item"
                              >
                                <span
                                  onClick={() => {
                                    this.openStudentDetail(
                                      tableContent.student
                                    );
                                  }}
                                >
                                  <i class="fas fa-pen"></i>
                                </span>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              )}
          </table>
        </div>
      </div>
    );
  }
}
