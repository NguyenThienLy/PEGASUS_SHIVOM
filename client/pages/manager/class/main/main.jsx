import * as React from "react";

import {
    Tooltip,
} from 'react-tippy';
import * as moment from 'moment'

import './main.scss'

import Router from 'next/router'

import Swal from 'sweetalert2'

import { action } from '../../../../actions'
import { api } from '../../../../services'

export class MainClass extends React.Component {
    constructor(props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this)
    }
    shouldComponentUpdate() {
        return true
    }
    open(classId) {
        Router.push(`/manager/class/class?classId=${classId}`, `/quan-ly/lop-hoc/chi-tiet/${classId}`)
    }
    async changeStatus(classId, status) {

        let isCanceled = false
        if (status == "deactive") {
            await Swal.fire({
                title: 'Thay đổi trạng thái',
                text: "Các học viên sẽ không thể checkin vào giờ học của lớp này được",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Thay đổi'
            }).then((result) => {
                if (!result.value) {
                    isCanceled = true
                }
            })
        }
        if (isCanceled) return
        Swal.showLoading()
        api.class.changeStatus(classId, status, {
            headers: {
                "x-token":
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
        }).then(res => {

            Swal.fire("Thành công", "Thay đổi trạng thái thành công", "success")
            this.props.dispatch({
                type: `UPDATE_CLASS_SUCCESS`,
                payload: res.result.object
            })
            this.forceUpdate()
            // Router.push(`/manager/class/class`, `/quan-ly/lop-hoc`)
        }).catch(err => {

            Swal.fire("Thất bại", "Thay đổi trạng thái thất bại", "error")
            this.props.dispatch({
                type: `UPDATE_CLASS_ERROR`,
                payload: err.message
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="member-main">
                    <div className="table">
                        <div className="table__title">
                            <div className="table__title__icon">
                                <i className="fas fa-clipboard-list" />
                            </div>
                            <div className="table__title__content">Danh sách lớp học</div>
                        </div>
                        <div className="table__content">
                            <table className="member-table">
                                <tbody>
                                    <tr>
                                        <th>Thứ tự</th>
                                        <th>Tên</th>
                                        <th>Mô tả ngắn</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    {this.props.classes.items.map((item, index) => {

                                        return (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>

                                                <td>{item.name}</td>
                                                <td>{item.shortDescription}</td>
                                                <td>{item.status === "active" ? "Hoạt động" : "Không hoạt động"}</td>
                                                {/* <td>{moment(item.start_time).format('DD/MM/YYYY')}</td> */}
                                                {/* <td>Xoá </td> */}
                                                <td className="action-td">
                                                    <Tooltip
                                                        title="Chi tiết"
                                                        position="top"
                                                    >
                                                        <span className="post-open-button" onClick={() => this.open(item._id)}><i class="fas fa-share-square"></i></span>
                                                    </Tooltip>
                                                    {
                                                        item.status === "deactive" ?
                                                            (<Tooltip
                                                                title="Bật hoạt động"
                                                                position="top"
                                                            >
                                                                <span className="post-open-button" onClick={() => this.changeStatus(item._id, "active")}><i class="fas fa-toggle-on"></i></span>
                                                            </Tooltip>) :
                                                            (<Tooltip
                                                                title="Tắt hoạt động"
                                                                position="top"
                                                            >
                                                                <span className="post-open-button" onClick={() => this.changeStatus(item._id, "deactive")}><i class="fas fa-toggle-off"></i></span>
                                                            </Tooltip>)
                                                    }

                                                    {/* < Tooltip
                                                        title="Xoá"
                                                        position="top"
                                                    >
                                                        <span className="post-remove-button" onClick={() => this.delete(item._id)}><i class="fas fa-times"></i></span>
                                                    </Tooltip> */}
                                                </td>
                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
