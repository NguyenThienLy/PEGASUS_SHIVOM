import * as React from "react";

import {
    Tooltip,
} from 'react-tippy';
import * as moment from 'moment'
import Router from 'next/router'

import { Pagination } from '../../../../components'

import './main.scss'

import { action } from '../../../../actions'
import { api } from '../../../../services'
import Swal from 'sweetalert2'

import { AddPoint } from './components'


export class MainMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: undefined,
            currentPage: 1,
            modals: {
                addPoint: false
            },
            selectedStudentId: null
        }
        this.showHideModal = this.showHideModal.bind(this)
        this.searchByPhone = this.searchByPhone.bind(this)
        this.searchByCardId = this.searchByCardId.bind(this)
        this.checkin = this.checkin.bind(this)
        this.changePage = this.changePage.bind(this)
        this.addPoint = this.addPoint.bind(this)
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
            api.student.searchByPhone(value).then(res => {
                this.setState({
                    students: res.results.objects.rows
                })
            }).catch(err => {

            })
        } else {
            this.setState({
                students: undefined
            })
        }
    }
    searchByCardId(e) {
        const { name, value } = e.target
        if (value.length > 0) {
            api.student.getList({
                query: {
                    filter: { cardId: value }
                }
            }).then(res => {
                this.setState({
                    students: res.results.objects.rows
                })
            }).catch(err => {

            })
        } else {
            this.setState({
                students: undefined
            })
        }
    }
    checkin(studentId) {
        Swal.showLoading()
        api.student.checkIn(studentId).then(res => {
            Swal.fire("Thành công", "Checkin cho học viên thành công", "success")
        }).catch(err => {
            console.log("err: ", err)
            if (err.type === "student_exception_course_havent_applied") {
                Swal.fire("Thất bại", "Học viên không có lịch học vào giờ này", "error")
            } else {
                Swal.fire("Thất bại", "Checkin cho học viên thất bại", "error")
            }

        })
    }
    addPoint(body) {
        Swal.showLoading()
        api.student.update(this.state.selectedStudentId, {
            $inc: { point: body.point }
        }).then(res => {
            Swal.fire("Thành công", "Thêm điểm cho học viên thành công", "success")
        }).catch(err => {
            Swal.fire("Thất bại", "Thêm điểm cho học viên thất bại", "error")
        })
    }
    render() {
        const students = this.state.students ?
            this.state.students :
            this.props.students.items.slice(this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10, 10 * this.state.currentPage)
        return (
            <React.Fragment>
                <AddPoint
                    show={this.state.modals.addPoint}
                    hideModal={() => { this.showHideModal("addPoint") }}
                    addPoint={this.addPoint}
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
                    </div>
                    <div className="table">
                        <div className="table__title">
                            <div className="table__title__icon">
                                <i className="fas fa-clipboard-list" />
                            </div>
                            <div className="table__title__content">Danh sách học viên</div>
                        </div>
                        <div className="table__content">
                            <table >
                                <tbody>
                                    <tr>
                                        <th>Thứ tự</th>
                                        <th>Ảnh</th>
                                        <th>Họ và tên</th>
                                        <th>Mã số</th>
                                        <th>Số điện thoại</th>

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
                                                <td>{item.phone}</td>

                                                <td className="action-td">
                                                    <Tooltip
                                                        title="Checkin"
                                                        position="top"
                                                    >
                                                        <span className="post-remove-button" onClick={() => this.checkin(item._id)}><i class="far fa-check-circle"></i></span>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title="Cộng điểm"
                                                        position="top"
                                                    >
                                                        <span className="post-remove-button" onClick={() => {
                                                            this.setState({ selectedStudentId: item._id })
                                                            this.showHideModal("addPoint")
                                                        }}><i class="fas fa-plus-circle"></i></span>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title="Chi tiết"
                                                        position="top"
                                                    >
                                                        <span className="post-open-button" onClick={() => this.open(item._id)}><i class="fas fa-share-square"></i></span>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title="Chỉnh sửa"
                                                        position="top"
                                                    >
                                                        <span className="post-edit-button" onClick={() => this.edit(item._id)}> <i class="fas fa-pen"></i> </span>
                                                    </Tooltip>

                                                </td>
                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                        <div className="table__pagination">
                            <Pagination currentPage={this.state.currentPage} total={50} limit={10} changePage={this.changePage} />
                        </div>
                    </div>

                </div>
            </React.Fragment >
        );
    }
}


