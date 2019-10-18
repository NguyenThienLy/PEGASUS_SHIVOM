import * as React from "react";

import {
    Tooltip,
} from 'react-tippy';
import * as moment from 'moment'

import './main.scss'


import { Pagination, CustomSelect } from '../../../../components'

import Router from 'next/router'

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
            },
        }
        this.filterByStatus = this.filterByStatus.bind(this);
        this.changePage = this.changePage.bind(this)
    }
    changePage(pageNum) {
        this.setState({
            currentPage: pageNum
        })
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
        return true
    }
    open(courseId) {
        Router.push(`/manager/course/course?courseId=${courseId}`, `/quan-ly/khoa-hoc/chi-tiet/${courseId}`)
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
                <div className="member-main">
                    <div className="member-main__title">Danh sách khoá học</div>
                    <div className="member-main__content">
                        <div className="member-main__content__filter">

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
                                <tbody>
                                    <tr>
                                        <th>Thứ tự</th>
                                        <th>Ảnh</th>
                                        <th>Tên</th>
                                        <th>Sĩ số</th>
                                        <th>Sĩ số tối đa</th>
                                        <th>Mô tả ngắn</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    {(courses || []).map((item, index) => {

                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td ><img src={item.thumb} className="img-response avatar-image"></img></td>
                                                <td>{item.name}</td>
                                                <td>{item.currentStudentAmount}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.shortDescription}</td>

                                                <td>{item.status === "active" ? "Hoạt động" : "Không hoạt động"}</td>
                                                <td className="action-td">
                                                    <Tooltip
                                                        title="Chi tiết"
                                                        position="top"
                                                    >
                                                        <span className="post-open-button" onClick={() => this.open(item._id)}><i class="fas fa-share-square"></i></span>
                                                    </Tooltip>
                                                    {/* <Tooltip
                                                        title="Chỉnh sửa"
                                                        position="top"
                                                    >
                                                        <span className="post-edit-button" onClick={() => this.edit(item._id)}> <i class="fas fa-pen"></i> </span>
                                                    </Tooltip> */}
                                                    <Tooltip
                                                        title="Xoá"
                                                        position="top"
                                                    >
                                                        <span className="post-remove-button" onClick={() => this.delete(item._id)}><i class="fas fa-times"></i></span>
                                                    </Tooltip>
                                                </td>
                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="table__pagination">
                            {this.state.courses ?
                                <Pagination currentPage={this.state.currentPage} total={this.state.courses.length} limit={10} changePage={this.changePage} />
                                : <Pagination currentPage={this.state.currentPage} total={this.props.courses.items.length} limit={10} changePage={this.changePage} />}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
