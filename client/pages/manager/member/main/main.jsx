import * as React from "react";

import {
    Tooltip,
} from 'react-tippy';
import * as moment from 'moment'
import Router from 'next/router'

import { TableData } from '../../../../components'

import './main.scss'

import { action } from '../../../../actions'
import { api } from '../../../../services'
import Swal from 'sweetalert2'

export class MainMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: undefined
        }
        this.searchByPhone = this.searchByPhone.bind(this)
        this.checkin = this.checkin.bind(this)
    }
    shouldComponentUpdate() {
        return true
    }
    open(studentId) {
        Router.push(`/manager/member/member?studentId=${studentId}`, `/quan-ly/hoc-vien/chi-tiet/${studentId}`)
    }
    searchByPhone(e) {
        console.log("enae: ", e.target.value)
        const { name, value } = e.target
        if (value.length > 0) {
            api.student.searchByPhone(value, {
                query: {

                },
                headers: {
                    "x-token":
                        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
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
        api.student.checkIn(studentId, {
            headers: {
                "x-token":
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
        }).then(res => {
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
    render() {
        const students = this.state.students ? this.state.students : this.props.students.items
        return (
            <React.Fragment>
                <div className="member-main">
                    {/* <TableData
                        tableName="Danh sách học viên"
                        data={this.props.students.items}
                        collums={[
                            {
                                header: "Ảnh",
                                customHtml: `<img src={{avatar}} class="img-response avatar-image"/>`
                            },
                            {
                                header: "Họ",
                                property: "firstName"
                            },
                            {
                                header: "Tên",
                                property: "lastName"
                            },
                            {
                                header: "Sinh nhật",
                                customHtml: `moment({{birthday}}).format("DD/MM/YYYY")`
                            },
                            {
                                header: "Thao tác",
                                custom: (<div>
                               
                                    </div>)
                            }
                        ]} /> */}

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
                                    {students.map((item, index) => {

                                        return (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
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
                    </div>
                </div>
            </React.Fragment >
        );
    }
}


