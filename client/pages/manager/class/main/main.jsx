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
import { Pagination, CustomSelect } from '../../../../components'

export class MainClass extends React.Component {
    constructor(props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this)
        this.state = {
            currentPage: 1,
            isLoading: false,
            classes: null,
            filterByStatus: {
                placeholder: 'Chọn trạng thái',
                options: ['Tất cả', 'Hoạt động', 'Không hoạt động'],
                values: ['all', 'active', 'deactive']
            },
        }
        this.changePage = this.changePage.bind(this)
        this.filterByStatus = this.filterByStatus.bind(this);
    }
    filterByStatus(value) {
        // const { name, value } = e.target;
        if (value !== 'all') {
            this.setState({
                isLoading: true
            });
            const classes = this.props.classes.items.filter(classInfo => {
                return classInfo.status === value;
            });
            this.setState({
                classes,
                isLoading: false,
                currentPage: 1
            });
        } else {
            this.setState({
                classes: undefined,
                currentPage: 1
            });
        }
    }
    changePage(pageNum) {
        this.setState({
            currentPage: pageNum
        })
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
        // const classes = this.props.classes.items.slice(this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10, 10 * this.state.currentPage)
        const classes = this.state.classes
            ? this.state.classes.slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            )
            : (this.props.classes.items || []).slice(
                this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * 10,
                10 * this.state.currentPage
            );
        return (
            <React.Fragment>
                <div className="member-main">
                    <div className="member-main__title">Danh sách lớp học</div>
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
                                        <th>Tên</th>
                                        <th>Mô tả ngắn</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    {(classes || []).map((item, index) => {

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
                        <div className="table__pagination">
                            {this.state.classes ?
                                <Pagination currentPage={this.state.currentPage} total={this.state.classes.length} limit={10} changePage={this.changePage} />
                                : <Pagination currentPage={this.state.currentPage} total={this.props.classes.items.length} limit={10} changePage={this.changePage} />}
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}
