import * as React from 'react';
import { Tooltip } from 'react-tippy';
import Router from 'next/router';

import './main.scss';

import { Pagination, CustomSelect } from '../../../../components';

export class MainCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      isLoading: false,
      courses: null,
      filterByStatus: {
        placeholder: 'Chọn trạng thái',
        options: ['Tất cả', 'Hoạt động', 'Không hoạt động'],
        values: ['all', 'active', 'deactive']
      }
    };
    this.filterByStatus = this.filterByStatus.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  changePage(pageNum) {
    this.setState({
      currentPage: pageNum
    });
  }
  filterByStatus(value) {
    // const { name, value } = e.target;
    if (value !== 'all') {
      this.setState({
        isLoading: true
      });
      const courses = this.props.courses.items.filter(course => {
        return course.status === value;
      });
      this.setState({
        courses,
        isLoading: false,
        currentPage: 1
      });
    } else {
      this.setState({
        courses: undefined,
        currentPage: 1
      });
    }
  }
  shouldComponentUpdate() {
    return true;
  }
  openDetail(courseId) {
    Router.push(
      `/manager/course/course?courseId=${courseId}`,
      `/quan-ly/khoa-hoc/chi-tiet/${courseId}`
    );
  }
  openStatistic(courseId) {
    Router.push(
      `/manager/course/course?courseId=${courseId}`,
      `/quan-ly/khoa-hoc/thong-ke/${courseId}`
    );
  }
  render() {
    const courses = this.state.courses
      ? this.state.courses.slice(
          this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
          10 * this.state.currentPage
        )
      : (this.props.courses.items || []).slice(
          this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
          10 * this.state.currentPage
        );
    return (
      <React.Fragment>
        <div className="course-main">
          <div className="course-main__title">Danh sách khoá học</div>
          <div className="course-main__content">
            <div className="course-main__content__filter">
              <div>
                <div>Lọc theo trạng thái</div>
                <CustomSelect
                  customSelect={this.state.filterByStatus}
                  filterByStatus={this.filterByStatus}
                ></CustomSelect>
              </div>
            </div>
          </div>
          <div className="base-table">
            <div className="base-table__content">
              <table>
                <thead>
                  <tr>
                    <th>Thứ tự</th>
                    <th style={{ width: '15%' }}>Ảnh</th>
                    <th>Tên</th>
                    <th>Sĩ số</th>
                    <th>Sĩ số tối đa</th>
                    <th style={{ width: '30%' }}>Mô tả ngắn</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {(courses || []).map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ width: '15%' }}>
                          <img
                            alt=""
                            src={item.thumb}
                            className="img-response avatar-image"
                          ></img>
                        </td>
                        <td style={{ 'text-align': 'left' }}>{item.name}</td>
                        <td>{item.currentStudentAmount}</td>
                        <td>{item.quantity}</td>
                        <td style={{ 'text-align': 'left', width: '30%' }}>
                          {item.shortDescription}
                        </td>

                        <td>
                          {item.status === 'active'
                            ? 'Hoạt động'
                            : 'Không hoạt động'}
                        </td>
                        <td>
                          <div className="action-td">
                            <Tooltip
                              title="Chi tiết"
                              position="top"
                              className="action-td__item"
                            >
                              <span onClick={() => this.openDetail(item._id)}>
                                <i class="fas fa-info"></i>
                              </span>
                            </Tooltip>
                            <Tooltip
                              title="Thống kê"
                              position="top"
                              className="action-td__item"
                            >
                              <span
                                onClick={() => this.openStatistic(item._id)}
                              >
                                <i class="fas fa-chart-bar"></i>
                              </span>
                            </Tooltip>
                            {/* <Tooltip
                                                        title="Chỉnh sửa"
                                                        position="top"
                                                    >
                                                        <span className="post-edit-button" onClick={() => this.edit(item._id)}> <i class="fas fa-pen"></i> </span>
                                                    </Tooltip> */}
                            {/* <Tooltip
                                                        title="Xoá"
                                                        position="top"
                                                    >
                                                        <span className="post-remove-button" onClick={() => this.delete(item._id)}><i class="fas fa-times"></i></span>
                                                    </Tooltip> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="base-table__divider"></div>
            <div className="base-table__pagination">
              {this.state.courses ? (
                <Pagination
                  currentPage={this.state.currentPage}
                  total={this.state.courses.length}
                  limit={10}
                  changePage={this.changePage}
                />
              ) : (
                <Pagination
                  currentPage={this.state.currentPage}
                  total={this.props.courses.items.length}
                  limit={10}
                  changePage={this.changePage}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
