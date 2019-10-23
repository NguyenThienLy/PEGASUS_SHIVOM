import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./extendTimeCourse.scss"
import { api } from '../../../../../../services'
import * as moment from 'moment'
import { Form, CourseOptions, TimeTableOptions, Loading } from '../../../../../../components'
import Swal from "sweetalert2";

export class ExtendTimeCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            student: {},
            courseStudents: [],
            formData: {
                courses: []
            },
            isLoading: false,
            selectedCourseStudent: null,
            selectedPackage: null,
            packages: [],
            selectedType: "monthAmount",
            monthAmount: 1
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        if (this.props.studentId) {
            this.setState({
                isLoading: true
            })
            const student = this.props.students.items.find((student) => {
                return student._id === this.props.studentId
            })
            this.setState({ student: student })
            this.getCourseOfStudent(this.props.studentId)
        }
    }

    closeModal() {
        this.props.hideModal();
    }
    submit(body) {
        this.props.hideModal();
        this.props.extendTimeCourse(this.state.selectedCourseStudent._id, {
            type: this.state.selectedType,
            package: body.package,
            monthAmount: this.state.monthAmount,
            isPayFee: JSON.parse(body.isPayFee)
        });

    }
    handleSelectCoursePackage = (courseId, packageId) => {
        const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
        const packageData = this.props.package.items.find((packageData) => { return packageData._id === packageId })
        if (courseIndex === -1) {
            this.state.formData.courses.push({
                _id: courseId, package: packageId, timeTables: [], price: packageData.price, type: "package"
            })
        } else {
            if (packageId === this.state.formData.courses[courseIndex].package) {
                this.state.formData.courses.splice(courseIndex, 1)
            } else {
                this.state.formData.courses[courseIndex] = {
                    _id: courseId, package: packageId, timeTables: this.state.formData.courses[courseIndex].timeTables, price: packageData.price, type: "package"
                }
            }
        }
        this.setState({ formData: this.state.formData })
    }
    handleInputCourseMonthAmount = (courseId, monthAmount) => {

        const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
        const courseData = this.props.courses.items.find((courseData) => { return courseData._id === courseId })
        if (monthAmount === 0 && courseIndex !== -1) {
            this.state.formData.courses.splice(courseIndex, 1)
        } else if (courseIndex === -1) {

            this.state.formData.courses.push({
                _id: courseId, monthAmount: monthAmount, timeTables: [], price: courseData.pricePerMonth * monthAmount, type: "monthAmount"
            })
        } else if (courseIndex !== -1) {
            this.state.formData.courses[courseIndex] = {
                _id: courseId, monthAmount: monthAmount, timeTables: this.state.formData.courses[courseIndex].timeTables, price: courseData.pricePerMonth * monthAmount, type: "monthAmount"
            }
        }
        this.setState({ formData: this.state.formData })
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.show && nextProps.studentId !== this.props.studentId) {
            this.setState({
                isLoading: true
            })
            const student = this.props.students.items.find((student) => {
                return student._id === nextProps.studentId
            })
            this.setState({ student: student })
            this.getCourseOfStudent(nextProps.studentId)
        }
        if (this.props.selectedCourseStudent && nextProps.show && nextProps.selectedCourseStudent._id !== this.props.selectedCourseStudent._id) {
            const packages = this.props.package.items.filter((packageData) => {
                return packageData.course === nextProps.selectedCourseStudent.course._id
            })
            this.setState({
                selectedCourseStudent: nextProps.selectedCourseStudent, packages,
                selectedPackage: null, selectedType: "monthAmount"
            })

        }
    }
    getCourseOfStudent(studentId) {
        api.courseStudent.getList({
            query: {
                filter: {
                    student: studentId
                },
                populates: ["course"]
            }
        }).then(res => {
            if (res.results.objects.count === 0) {
                this.hideModal()
                Swal.fire("Học viên hiện không học khoá nào", "", "info")
            } else {
                const packages = this.props.package.items.filter((packageData) => {
                    return packageData.course === res.results.objects.rows[0].course._id
                })
                this.setState({ courseStudents: res.results.objects.rows, selectedCourseStudent: res.results.objects.rows[0], packages })
                this.setState({
                    isLoading: false
                })
            }
        })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
            })

    }
    handleChange(name, value) {
        switch (name) {
            case "courseStudentId":
                const courseStudent = this.state.courseStudents.find((courseStudent => {
                    return courseStudent._id === value
                }))
                const packages = this.props.package.items.filter((packageData) => {
                    return packageData.course === courseStudent.course._id
                })
                this.setState({
                    selectedCourseStudent: courseStudent, packages
                })
                break
            case "type":
                if (value === "package" && this.state.packages.length > 0) {
                    const packageData = this.props.package.items.find((packageData) => {
                        return packageData.course === this.props.selectedCourseStudent.course._id
                    })
                    this.setState({ selectedPackage: packageData })
                }
                this.setState({
                    selectedType: value
                })
                break
            case "monthAmount":

                this.setState({
                    monthAmount: Number(value)
                })
                break
            case "packageId":
                const packageData = this.props.package.items.find((packageData) => {
                    return packageData._id === value
                })
                this.setState({
                    selectedPackage: packageData
                })
                break
        }
    }
    render() {
        const { show } = this.props;
        return (
            <section>
                <Modal
                    visible={show}
                    width="700"
                    height="auto"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >


                    {this.state.isLoading ? <Loading /> :
                        <Form
                            handleChange={this.handleChange}
                            title={`Gia hạn khoá học cho ${this.state.student.firstName} ${this.state.student.lastName}`}
                            form={{
                                courseStudentId: {
                                    type: "text",
                                    label: "Khoá học",
                                    placeholder: "Tên khoá học",
                                    defaultValue: (this.props.selectedCourseStudent.course || {}).name,
                                    value: (this.props.selectedCourseStudent.course || {}).name,
                                    isValid: true,
                                    readonly: true,
                                    errorMessage: ""
                                },
                                startTime: {
                                    type: "text",
                                    label: "Thời gian bắt đầu học hiện tại",
                                    placeholder: moment((this.props.selectedCourseStudent || {}).startTime).format("DD/MM/YYYY"),
                                    value: "",
                                    isValid: true,
                                    errorMessage: "",
                                    readonly: true
                                },
                                endTime: {
                                    type: "text",
                                    label: "Thời gian kết thúc học hiện tại",
                                    placeholder: moment((this.props.selectedCourseStudent || {}).endTime).format("DD/MM/YYYY"),
                                    value: "",
                                    isValid: true,
                                    errorMessage: "",
                                    readonly: true
                                },
                                type: {
                                    type: "select",
                                    label: "Loại gia hạn",
                                    placeholder: "Chọn loại gia hạn",
                                    value: "monthAmount",
                                    options: [
                                        {
                                            name: "Gia hạn theo tháng",
                                            value: "monthAmount"
                                        },
                                        {
                                            name: "Gia hạn theo gói",
                                            value: "package"
                                        }
                                    ],
                                    isValid: true,
                                    errorMessage: "",
                                    isHandleChange: true
                                },
                                monthAmount: {
                                    type: "number",
                                    label: "Số tháng",
                                    placeholder: "Số tháng học",
                                    defaultValue: 1,
                                    value: 1,
                                    isValid: true,
                                    errorMessage: "",
                                    hidden: this.state.selectedType === "package" ? true : false,

                                    isHandleChange: true
                                },
                                package: {
                                    type: "select",
                                    label: "Tên gói",
                                    placeholder: "Chọn gói học",
                                    value: this.state.packages.length > 0 ? this.state.packages[0]._id : "",
                                    options: this.state.packages.length > 0 ? this.state.packages.map((packageData) => {
                                        return {
                                            name: packageData.name,
                                            value: packageData._id
                                        }
                                    }) : [],
                                    isValid: this.state.packages.length > 0 || this.state.selectedType !== "package" ? true : false,
                                    errorMessage: "",
                                    hidden: this.state.selectedType !== "package" ? true : false,
                                    isHandleChange: true
                                },
                                price: {
                                    type: "text",
                                    label: "Số tiền phải đóng",
                                    placeholder: this.state.selectedType === "monthAmount" ? (this.props.selectedCourseStudent.course || {}).pricePerMonth * this.state.monthAmount : (this.state.selectedPackage ? this.state.selectedPackage.price : "Khoá học này không có gói nào"),
                                    value: "",
                                    isValid: true,
                                    errorMessage: "",
                                    readonly: true
                                },
                                isPayFee: {
                                    type: "radio",
                                    label: "Học viên đã thanh toán tiền học gia hạn",
                                    placeholder: "",
                                    options: [
                                        // {
                                        //     name: "Chưa thanh toán",
                                        //     value: false,
                                        //     selected: true
                                        // },
                                        {
                                            name: "Đã thanh toán",
                                            value: true
                                        }
                                    ],
                                    value: false,
                                    isValid: true,
                                    errorMessage: ""
                                }
                            }}
                            validate={{
                                rules: {
                                    courseStudentId: {
                                        required: true
                                    },
                                    monthAmount: {
                                        regexr: /^[+]?\d+([.]\d+)?$/
                                    }
                                },
                                messages: {
                                    courseStudentId: {
                                        required: "Bắt buộc nhập số điểm"
                                    },
                                    monthAmount: {
                                        regexr: "Phải nhập số tháng là dương"
                                    }
                                }
                            }}
                            submit={this.submit}
                        />
                    }

                </Modal>
            </section>
        );
    }
}
