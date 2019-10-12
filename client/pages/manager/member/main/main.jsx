import * as React from "react";

import {
    Tooltip,
} from 'react-tippy';
import * as moment from 'moment'
import Router from 'next/router'

import { Pagination, Loading } from '../../../../components'

import './main.scss'

import { action } from '../../../../actions'
import { api } from '../../../../services'
import Swal from 'sweetalert2'

import { AddPoint, Relearn, Leave, ExtendTimeCourse, RegisNewCourse } from './components'


export class MainMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: undefined,
            currentPage: 1,
            modals: {
                addPoint: false,
                leave: false,
                relearn: false,
                extendTimeCourse: false,
                regisNewCourse: false
            },
            selectedStudentId: null,
            isFilterByUpcommingBirthday: false,
            isFilterByPoint: false,
            isLoading: false
        }
        this.showHideModal = this.showHideModal.bind(this)
        this.searchByPhone = this.searchByPhone.bind(this)
        this.searchByCardId = this.searchByCardId.bind(this)
        this.filterByUpcommingBirthday = this.filterByUpcommingBirthday.bind(this)
        this.filterByStatus = this.filterByStatus.bind(this)
        this.filterByPoint = this.filterByPoint.bind(this)
        this.checkin = this.checkin.bind(this)
        this.changePage = this.changePage.bind(this)
        this.addPoint = this.addPoint.bind(this)
        this.leave = this.leave.bind(this)
        this.relearn = this.relearn.bind(this)
        this.extendTimeCourse = this.extendTimeCourse.bind(this)
        this.regisNewCourse = this.regisNewCourse.bind(this)
    }
    shouldComponentUpdate() {
        return true
    }
    showHideModal(key) {
        this.state.modals[key] = !this.state.modals[key]
        this.setState({ modals: this.state.modals })
    }
    open(studentId) {
        Router.push(`/manager/member/member?studentId=${studentId}`, `/quan-ly/hoc-vien/chi-tiet/${studentId}`)
    }
    changePage(pageNum) {
        this.setState({
            currentPage: pageNum
        })
    }
    searchByPhone(e) {
        const { name, value } = e.target
        if (value.length > 0) {
            this.setState({
                isLoading: true
            })
            api.student.searchByPhone(value).then(res => {
                this.setState({
                    students: res.results.objects.rows,
                    isLoading: false
                })
            }).catch(err => {

            })
        } else {
            this.setState({
                students: undefined,
                isLoading: false
            })
        }
    }
    searchByCardId(e) {

        const { name, value } = e.target
        if (value.length > 0) {
            this.setState({
                isLoading: true
            })
            api.student.getList({
                query: {
                    filter: { cardId: value }
                }
            }).then(res => {
                this.setState({
                    students: res.results.objects.rows,
                    isLoading: false
                })
            }).catch(err => {

            })
        } else {
            this.setState({
                students: undefined,
                isLoading: false
            })
        }

    }
    filterByStatus(e) {
        const { name, value } = e.target
        if (value !== "all") {
            this.setState({
                isLoading: true
            })
            const students = this.props.students.items.filter((student) => { return student.status === value })
            this.setState({
                students, isLoading: false
            })
        } else {
            this.setState({
                students: undefined
            })
        }
    }
    filterByPoint(e) {
        const { name, value } = e.target
        this.setState({
            isLoading: true
        })
        switch (value) {
            case "all":
                this.setState({
                    students: null,
                    isLoading: false
                })
                break
            case "height":
                this.setState({
                    students: _.sortBy(this.props.students.items, "point", "desc").reverse(),
                    isLoading: false
                })
                break
            case "low":
                this.setState({
                    students: _.sortBy(this.props.students.items, "point", "asc"),
                    isLoading: false
                })
                break

        }
    }
    filterByUpcommingBirthday() {
        this.setState({
            isLoading: true
        })
        if (!this.state.isFilterByUpcommingBirthday) {
            api.student.getListStudentUpcommingBirthday({
                query: {

                }
            }).then(res => {
                this.setState({
                    students: res.results.objects.rows,
                    isLoading: false
                })
            }).catch(err => {

            })
        } else {
            this.setState({
                students: undefined,
                isLoading: false
            })
        }
        this.setState({
            isFilterByUpcommingBirthday: !this.state.isFilterByUpcommingBirthday,

        })
    }
    checkin(studentId) {
        Swal.showLoading()
        api.student.checkIn(studentId).then(res => {
            Swal.fire("Thành công", "Checkin cho học viên thành công", "success")
        }).catch(err => {
            if (err.type === "student_exception_course_havent_applied") {
                Swal.fire("Thất bại", "Học viên không có lịch học vào giờ này", "error")
            } else {
                Swal.fire("Thất bại", "Checkin cho học viên thất bại", "error")
            }

        })
    }
    addPoint(body) {
        Swal.showLoading()
        api.student.addPoint(this.state.selectedStudentId, body).then(res => {
            Swal.fire("Thành công", "Thêm điểm cho học viên thành công", "success")

        }).catch(err => {
            Swal.fire("Thất bại", "Thêm điểm cho học viên thất bại", "error")
        })
        this.setState({
            selectedStudentId: null
        })
    }
    leave(body) {
        Swal.showLoading()
        api.student.leave(this.state.selectedStudentId, body.isRemoveCard).then(res => {
            Swal.fire("Thành công", "Học viên nghỉ học thành công", "success")
            const student = res.result.object.find((result) => {
                return result.hasOwnProperty("cardId")
            })
            this.props.dispatch({
                type: `UPDATE_STUDENT_SUCCESS`,
                payload: student
            })
            this.forceUpdate()
        }).catch(err => {
            Swal.fire("Thất bại", "Thay đổi thất bại", "error")
        })
        this.setState({
            selectedStudentId: null
        })
    }
    relearn(body) {
        Swal.showLoading()
        api.student.relearn(this.state.selectedStudentId, body).then(res => {
            Swal.fire("Thành công", "Học viên quay lại học thành công", "success")
            const student = res.result.object.find((result) => {
                return result.hasOwnProperty("cardId")
            })

            this.props.dispatch({
                type: `UPDATE_STUDENT_SUCCESS`,
                payload: student
            })
            this.forceUpdate()
        }).catch(err => {
            Swal.fire("Thất bại", "Thay đổi thất bại", "error")
        })
        this.setState({
            selectedStudentId: null
        })
    }
    extendTimeCourse(courseStudentId, body) {
        Swal.showLoading()
        api.courseStudent.extendTimeCourse(courseStudentId, body).then(res => {
            Swal.fire("Thành công", "Gia hạn thời gian học cho học viên thành công", "success")
        }).catch(err => {
            Swal.fire("Thất bại", "Gia hạn thời gian học cho học viên thất bại", "error")
        })
        this.setState({
            selectedStudentId: null
        })
    }
    regisNewCourse(body) {
        Swal.showLoading()
        api.student.enrollToCourse(this.state.selectedStudentId, body).then(res => {
            Swal.fire("Thành công", "Đăng ký khoá học cho học viên thành công", "success")
        }).catch(err => {
            Swal.fire("Thất bại", "Đăng ký khoá học cho học viên thất bại", "error")
        })
        this.setState({
            selectedStudentId: null
        })
    }
    render() {
        const students = this.state.students ?
            this.state.students :
            (this.props.students.items || []).slice(this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10, 10 * this.state.currentPage)
        return (
            <React.Fragment>
                <AddPoint
                    show={this.state.modals.addPoint}
                    hideModal={() => { this.showHideModal("addPoint") }}
                    addPoint={this.addPoint}
                />
                <Leave
                    show={this.state.modals.leave}
                    hideModal={() => { this.showHideModal("leave") }}
                    addPoint={this.leave}
                />
                <Relearn
                    show={this.state.modals.relearn}
                    hideModal={() => { this.showHideModal("relearn") }}
                    relearn={this.relearn}
                />
                <ExtendTimeCourse
                    show={this.state.modals.extendTimeCourse}
                    hideModal={() => { this.showHideModal("extendTimeCourse") }}
                    extendTimeCourse={this.extendTimeCourse}
                    studentId={this.state.selectedStudentId}
                    {...this.props}
                />
                <RegisNewCourse
                    show={this.state.modals.regisNewCourse}
                    hideModal={() => { this.showHideModal("regisNewCourse") }}
                    regisNewCourse={this.regisNewCourse}
                    studentId={this.state.selectedStudentId}
                    {...this.props}
                />
                <div className="member-main">
                    <div className="member-main__filter">
                        <div>
                            <label>Tìm theo số điện thoại</label><br />
                            <input
                                type="text"
                                className="member-main__filter__input"
                                name="phone"
                                onChange={this.searchByPhone}
                                onBlur={this.searchByPhone}
                            ></input>
                        </div>

                        <div>
                            <label>Tìm theo thẻ</label><br />
                            <input
                                type="text"
                                className="member-main__filter__input"
                                name="cardId"
                                onChange={this.searchByCardId}
                                onBlur={this.searchByCardId}
                            ></input>
                        </div>
                        <div>
                            <label>Lọc theo sắp sinh nhật</label><br />
                            <button
                                style={this.state.isFilterByUpcommingBirthday ? { backgroundColor: "green" } : null}
                                onClick={this.filterByUpcommingBirthday}
                            >Lọc theo sắp tới sinh nhật</button>
                        </div>
                        <div>
                            <label>Sắp xếp theo điểm</label><br />
                            <select onChange={this.filterByPoint}>
                                <option value="all">Bình thường</option>
                                <option value="height">Cao tới thấp</option>
                                <option value="low">Thấp tới cao</option>
                            </select>
                        </div>
                        <div>
                            <label>Trạng thái</label><br />
                            <select onChange={this.filterByStatus}>
                                <option value="all">Tất cả</option>
                                <option value="active">Đang học</option>
                                <option value="deactive">Nghỉ học</option>
                            </select>
                        </div>
                    </div>
                    <div className="table">
                        <div className="table__title">
                            <div className="table__title__icon">
                                <i className="fas fa-clipboard-list" />
                            </div>
                            <div className="table__title__content">Danh sách học viên</div>
                        </div>
                        <div className="table__content">
                            {this.state.isLoading === true ? <Loading /> :
                                <table >
                                    <tbody>
                                        <tr>
                                            <th>Thứ tự</th>
                                            <th>Ảnh</th>
                                            <th>Họ và tên</th>
                                            <th>Mã số</th>
                                            <th>Điểm</th>
                                            <th>Sinh nhật</th>
                                            <th>Số điện thoại</th>
                                            <th>Trạng thái</th>
                                            <th>Thao tác</th>
                                        </tr>
                                        {(students || []).map((item, index) => {
                                            // {[].map((item, index) => {
                                            return (
                                                <tr key={item._id}>
                                                    <td>{this.state.currentPage === 1 ? index + 1 : (this.state.currentPage - 1) * 10 + index + 1}</td>
                                                    <td ><img src={item.avatar} className="img-response avatar-image"></img></td>
                                                    <td>{item.firstName} {item.lastName}</td>
                                                    <td>{item.cardId}</td>
                                                    <td>{item.point}</td>
                                                    <td>{moment(item.birthday).format("DD/MM/YYYY")}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.status === "active" ? "Đang học" : "Nghỉ học"}</td>
                                                    {item.status === "active" ?
                                                        <td className="action-td">

                                                            <Tooltip
                                                                title="Checkin"
                                                                position="top"
                                                            >
                                                                <span className="action-td__item" onClick={() => this.checkin(item._id)}><i class="far fa-check-circle"></i></span>
                                                            </Tooltip>
                                                            <Tooltip
                                                                title="Cộng điểm"
                                                                position="top"
                                                            >
                                                                <span className="action-td__item" onClick={() => {
                                                                    this.setState({ selectedStudentId: item._id })
                                                                    this.showHideModal("addPoint")
                                                                }}><i class="fas fa-plus-circle"></i></span>
                                                            </Tooltip>
                                                            <Tooltip
                                                                title="Nghỉ học"
                                                                position="top"
                                                            >
                                                                <span className="action-td__item" onClick={() => {
                                                                    this.setState({ selectedStudentId: item._id })
                                                                    this.showHideModal("leave")
                                                                }}><i class="fas fa-user-times"></i></span>
                                                            </Tooltip>
                                                            <Tooltip
                                                                title="Chi tiết"
                                                                position="top"
                                                            >
                                                                <span className="action-td__item" onClick={() => this.open(item._id)}><i class="fas fa-share-square"></i></span>
                                                            </Tooltip>
                                                            {/* <Tooltip
                                                            title="Chỉnh sửa"
                                                            position="top"
                                                        >
                                                            <span className="action-td__item" onClick={() => this.edit(item._id)}> <i class="fas fa-pen"></i> </span>
                                                        </Tooltip> */}
                                                            <Tooltip
                                                                title="Gia hạn học"
                                                                position="top"
                                                            >
                                                                <span className="action-td__item" onClick={() => {
                                                                    this.setState({ selectedStudentId: item._id })
                                                                    this.showHideModal("extendTimeCourse")
                                                                }}> <i class="fas fa-business-time"></i></span>
                                                            </Tooltip>
                                                            <Tooltip
                                                                title="Đăng ký khoá học"
                                                                position="top"
                                                            >
                                                                <span className="action-td__item" onClick={() => {
                                                                    this.setState({ selectedStudentId: item._id })
                                                                    this.showHideModal("regisNewCourse")
                                                                }}><i class="fas fa-fist-raised"></i></span>
                                                            </Tooltip>
                                                        </td>
                                                        : <td className="action-td">
                                                            <button
                                                                onClick={() => {
                                                                    this.setState({ selectedStudentId: item._id })
                                                                    this.showHideModal("relearn")
                                                                }}
                                                            >Học lại</button>
                                                        </td>}
                                                </tr>

                                            )
                                        })}
                                    </tbody>
                                </table>}

                        </div>
                        <div className="table__pagination">
                            {!this.state.students ?
                                <Pagination currentPage={this.state.currentPage} total={(this.props.students.items || []).length} limit={10} changePage={this.changePage} /> : null}
                        </div>
                    </div>

                </div>
            </React.Fragment >
        );
    }
}


