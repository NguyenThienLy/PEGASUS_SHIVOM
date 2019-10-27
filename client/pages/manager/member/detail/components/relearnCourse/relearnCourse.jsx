import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./relearnCourse.scss"
import { api } from '../../../../../../services'
import * as moment from 'moment'
import { Form, CourseOptions, TimeTableOptions, Loading } from '../../../../../../components'
import Swal from "sweetalert2";

export class RelearnCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            student: {},
            courses: [],
            courseLearnedIds: [],
            isLoading: false,
            selectedCourse: {},
            packages: [],
            selectedType: "monthAmount",
            monthAmount: 1,
            selectedPackage: null,
            endTime: moment().add(1, "months").format(),
            startTime: new Date(),
            formData: {}
        };
        this.submit = this.submit.bind(this);
        this.submitForm = this.submitForm.bind(this)
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
    submitForm(body) {
        // this.props.hideModal();

        this.setState({ formData: body, currentStep: 2 })
    }
    submit(body) {
        this.props.hideModal()
        this.props.relearnCourse(this.state.selectedCourseStudent._id, {
            type: this.state.selectedType,
            package: body.package,
            monthAmount: Number(this.state.monthAmount),
            isPayFee: JSON.parse(body.isPayFee),
            startTime: moment(this.state.startTime).format()
        })
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
            let courseLearnedIds = []
            courseLearnedIds = res.results.objects.rows.map((courseStudent) => {
                return courseStudent.course._id
            })
            const courses = this.props.courses.items.filter((course) => {
                return courseLearnedIds.indexOf(course._id) === -1
            })
            const packages = this.props.package.items.filter((packageData) => {
                return packageData.course === courses[0]._id
            })
            this.setState({ courseLearnedIds, courses, selectedCourse: courses[0], packages })
            this.setState({
                isLoading: false
            })
        })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
            })

    }
    handleChooseTimeTableItem = (courseId, timeTableItemId) => {

        const timeTableItemIndex = this.state.timeTableIds.findIndex(timeTableItem => {
            return timeTableItemId === timeTableItem;
        });
        if (timeTableItemIndex === -1) {
            this.state.timeTableIds.push(timeTableItemId);
        } else {
            this.state.timeTableIds.splice(
                timeTableItemIndex,
                1
            );
        }
        this.setState({ timeTableIds: this.state.timeTableIds });
    };
    handleChange(name, value) {
        switch (name) {
            case "courseId":
                const course = this.props.courses.items.find((course => {
                    return course._id === value
                }))
                const packages = this.props.package.items.filter((packageData) => {
                    return packageData.course === course._id
                })
                this.setState({
                    packages, selectedCourse: course, selectedPackage: packages[0] || null,
                    timeTableIds: []
                })
                break
            case "type":
                if (value === "package" && this.state.packages.length > 0) {
                    let endTime = moment(this.state.startTime).add(this.state.packages[0].monthAmount, "months").format()
                    this.setState({ selectedPackage: this.state.packages[0] || null, endTime })
                }
                if (value === "monthAmount") {
                    let endTime = moment(this.state.startTime).add(this.state.monthAmount, "months").format()
                    this.setState({ endTime })
                }
                this.setState({
                    selectedType: value
                })
                break
            case "monthAmount":
                let endTime = moment(this.state.endTime).add(value - this.state.monthAmount, "months").format()
                this.setState({
                    monthAmount: value, endTime
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
            case "startTime":
                if (this.state.selectedType === "package") {
                    let endTime = moment(value).add(this.state.selectedPackage.monthAmount, "months").format()
                    this.setState({
                        startTime: value,
                        endTime
                    })
                } else {
                    this.setState({
                        startTime: value,
                        endTime: moment(value).add(this.state.monthAmount, "months").format()
                    })
                }

        }
    }
    render() {
        const { show } = this.props;
        return (
            <section>
                <Modal
                    visible={show}
                    width="1000"
                    height="auto"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >


                    {this.state.isLoading ? <Loading /> :
                        <React.Fragment>
                            <Form
                                handleChange={this.handleChange}
                                title={`Đăng ký học lại khoá học cho ${this.state.student.firstName} ${this.state.student.lastName}`}
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
                                    type: {
                                        type: "select",
                                        label: "Loại đăng ký",
                                        placeholder: "Chọn loại đăng ký",
                                        value: "monthAmount",
                                        options: [
                                            {
                                                name: "Đăng ký theo tháng",
                                                value: "monthAmount"
                                            },
                                            {
                                                name: "Đăng ký theo gói",
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
                                    startTime: {
                                        type: "datetime",
                                        label: "Thời gian bắt đầu học",
                                        placeholder: moment().format(),
                                        value: this.state.startTime,
                                        isValid: true,
                                        errorMessage: "",
                                        isHandleChange: true
                                    },
                                    endTime: {
                                        type: "text",
                                        label: "Thời gian kết thúc học",
                                        placeholder: moment(this.state.endTime).format("DD/MM/YYYY"),
                                        value: "",
                                        isValid: true,
                                        errorMessage: "",
                                        readonly: true
                                    },
                                    price: {
                                        type: "text",
                                        label: "Số tiền phải đóng",
                                        placeholder: this.state.selectedType === "monthAmount" ? this.state.selectedCourse.pricePerMonth * this.state.monthAmount : (this.state.selectedPackage ? this.state.selectedPackage.price : "Khoá học này không có gói nào"),
                                        value: "",
                                        isValid: true,
                                        errorMessage: "",
                                        readonly: true
                                    },
                                    isPayFee: {
                                        type: "radio",
                                        label: "Học viên đã thanh toán tiền học",
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
                                            // regexr: /^[+]?\d+([.]\d+)?$/
                                        }
                                    },
                                    messages: {
                                        courseStudentId: {
                                            required: "Bắt buộc nhập số điểm"
                                        },
                                        monthAmount: {
                                            regexr: "Số tháng học phải lớn hơn 0"
                                        }
                                    }
                                }}
                                buttonTitle="Hoàn thành"
                                submit={this.submit}
                            />

                        </React.Fragment>
                    }

                </Modal>
            </section>
        );
    }
}
