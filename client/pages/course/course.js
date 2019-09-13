import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { api } from "../../services";
import { action } from "../../actions";

import "./course.scss";
import { Header, Footer, TrainerInfo, ContactUs, RingingPhone, LatestPost, SearchBox } from "../../components";
import { SocialGroup } from "../../components/footer/socialGroup/socialGroup"
import { RegisterBtn } from './registerBtn/registerBtn'

export class Course extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeTables: [],
			course: {
				image:
					'https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-3a.jpg',
				dateCreated: {
					day: "7th",
					month: "jun"
				},
				author: 'jane skim',
				title: 'Sketching',
				content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur, amet voluptatum, natus eum dolore ex aspernatur assumenda vel magni iusto praesentium dolores ad aliquam tempora obcaecati quae, commodi totam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur, amet voluptatum, natus eum dolore ex aspernatur assumenda vel magni iusto praesentium dolores ad aliquam tempora obcaecati quae, commodi totam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas consectetur, amet voluptatum, natus eum dolore ex aspernatur assumenda vel magni iusto praesentium dolores ad aliquam tempora obcaecati quae, commodi totam.',
				targets: ['Giảm cân', 'Tăng sức khoẻ', 'Tăng trí nhớ', 'Tăng sức mạnh tim mạch', 'Đẩy lui bệnh tật', 'tịnh tâm', 'giữ gìn sắc đẹp'],
			},
			moreCourses: [
				{
					name: 'yoga cộng đồng',
					trainerInfo: {
						name: 'ngọc hạnh',
						avatar: 'https://dalia.elated-themes.com/wp-content/uploads/2018/06/makeup-image-gallery-2.jpg',
						shortDescription: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sapiente magnam possimus libero deserunt.',
						age: 21,
						weight: '50kg',
						height: '1m62',
						position: 'giáo viên'
					},
					classes: [
						{
							date: 'Tuesday',
							starttime: '18h00',
							endtime: '19h00',
							teacher: 'Ngọc Hạnh'
						},
						{
							date: 'Thursday',
							starttime: '19h00',
							endtime: '20h00',
							teacher: 'Ngọc Hạnh'
						},
						{
							date: 'Friday',
							starttime: '20h00',
							endtime: '21h00',
							teacher: 'Ngọc Hạnh'
						}
					],
				},
				{
					name: 'yoga cộng đồng',
					trainerInfo: {
						name: 'ngọc hạnh',
						avatar: 'https://dalia.elated-themes.com/wp-content/uploads/2018/06/makeup-image-gallery-2.jpg',
						shortDescription: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sapiente magnam possimus libero deserunt.',
						age: 21,
						weight: '50kg',
						height: '1m62',
						position: 'giáo viên'
					},
					classes: [
						{
							date: 'Tuesday',
							starttime: '18h00',
							endtime: '19h00',
							teacher: 'Ngọc Hạnh'
						},
						{
							date: 'Thursday',
							starttime: '19h00',
							endtime: '20h00',
							teacher: 'Ngọc Hạnh'
						},
						{
							date: 'Friday',
							starttime: '20h00',
							endtime: '21h00',
							teacher: 'Ngọc Hạnh'
						}
					],
				}
			],
			otherCourses: [
				{
					name: 'Course 1',
					classes: 3,
				},
				{
					name: 'Course 2',
					classes: 2,
				},
				{
					name: 'Course 3',
					classes: 3,
				},
			],
			latestPost: [
				{
					link: "#",
					image:
						"https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-6-150x150.jpg",
					title: "clean beauty",
					date: "13th jun"
				},
				{
					link: "#",
					image:
						"https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-8-150x150.jpg",
					title: "Daily Detox Frappé",
					date: "13th jun"
				},
				{
					link: "#",
					image:
						"https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-7-150x150.jpg",
					title: "Be Smart-Eat Wise WISE",
					date: "13th jun"
				}
			],
			sorter: {
				"monday": 1,
				"tuesday": 2,
				"wednesday": 3,
				"thursday": 4,
				"friday": 5,
				"saturday": 6,
				"sunday": 7
			},
			latestNews: []
		};
	}
	static async getInitialProps({ req, query }) {
		const slug = query.slug
		const course = await api.course.getCourseBySlug(slug)
		const timeTableOfCourseRes = await api.course.getTimeTableOfCourse(course._id)
		if (!timeTableOfCourseRes.result) {
			return { course }
		}
		return {
			course,
			timeTableOfCourse: timeTableOfCourseRes.result.object
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.course._id !== nextProps.course._id) {
			this.setState({ timeTables: [] })
		}
		if (nextProps.courses.items.length > 0 || this.props.course._id !== nextProps.course._id) {
			this.props.fetchTimeTableOfCourse(nextProps.course._id)
		}

		return true
	}
	shouldComponentUpdate(nextProps, nextState) {

		return true;
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		const courseItemIndex = this.props.courses.items.findIndex(item => { return item._id === this.props.course._id })
		if (courseItemIndex != -1 && (this.state.timeTables == undefined || (this.state.timeTables && this.state.timeTables.length === 0))) {
			setTimeout(() => {
				const courseData = this.props.courses.items[courseItemIndex]
				if (courseData.timeTables !== undefined) {

					this.setState({ timeTables: courseData.timeTables })
				}
			}, 1000);
		}
	}

	async componentDidMount() {

		this.fetchData()
		this.getLatestNews()
		var heightOfFooter = $(".course__footer .footer-wrapper").height();
		$(".course__contact-us").css("margin-bottom", heightOfFooter + "px");
	}
	getLatestNews() {
		api.news.getList({
			query: {
				order: { createdAt: -1 },
				populates: [{ path: "category", select: "name slug" }]
			}
		}).then(res => {
			this.setState({ latestNews: res.results.objects.rows })
		}).catch(err => {

		})
	}
	fetchData() {
		if (this.props.courses.items.length === 0) {
			this.props.fetchCourse()
		}
		if (!this.props.setting.fetched) {
			this.props.fetchSetting();
		}
		if (this.props.newCategories.items.length === 0) {
			this.props.fetchNewCategory()
		}

	}
	render() {
		return (
			<div className="course">
				<Head>
					<title>{this.props.course.name}</title>
					<meta name="title" content="Khoá học" />
					<meta name="description" content="Khoá học về yoga" />
				</Head>
				<Header {...this.props} />
				<React.Fragment>
					<div className="course-title">
						<span>
							<Link href="/home/home" as="/">
								<a href="/">Trang chủ</a>
							</Link> </span>&nbsp;&nbsp;<i className="fas fa-chevron-right"></i>&nbsp;&nbsp;
                        <span>
							<Link href={`/allCourses/allCourses`} as={`/khoa-hoc`}>
								<a href={`/khoa-hoc`}>Khoá học</a>
							</Link>
						</span> &nbsp;&nbsp;<i className="fas fa-chevron-right"></i>&nbsp;&nbsp;
                        <span>
							<Link href={`/course/course?slug=${this.props.course.slug}`} as={`/khoa-hoc/${this.props.course.slug}`}>
								<a href={`/khoa-hoc/${this.props.course.slug}`}>{this.props.course.name}</a>
							</Link>
						</span>

					</div>
					<div className="course-ringing-phone">
						<RingingPhone />
					</div>
					<div className="course-wrapper">


						<div className="course-wrapper__main-content">



							<div className="course-wrapper__main-content__image">
								{/* <div className="course-wrapper__main-content__image__dateCreated">
									<a>
										<span className="course-wrapper__main-content__image__dateCreated__day">
											{this.state.course.dateCreated.day}
										</span>
										<span className="course-wrapper__main-content__image__dateCreated__month">
											{this.state.course.dateCreated.month}
										</span>
									</a>
								</div> */}
								<img src={this.props.course.thumb} alt={this.props.course.name} />
							</div>



							{/* <div className="course-wrapper__main-content__author">
								{this.state.course.author}
							</div> */}
							<div className="course-wrapper__main-content__title">
								{this.props.course.name}
							</div>
							<div className="course-wrapper__main-content__content" dangerouslySetInnerHTML={{ __html: this.props.course.description }}>

							</div>
							<div className="course-wrapper__main-content__targets">
								{
									this.props.course.benefits.map((benefit, index) => {
										return (
											<div className="course-wrapper__main-content__targets__target" key={index}>
												<i className="fas fa-check"></i>
												{benefit}
											</div>
										)
									})
								}
							</div>
							{

								this.props.timeTableOfCourse && this.props.timeTableOfCourse.length > 0 ? this.props.timeTableOfCourse.map((classData, index) => {
									let sorter = {
										"monday": {
											value: 1,
											text: "Thứ hai"
										},
										"tuesday": {
											value: 2,
											text: "Thứ ba"
										},
										"wednesday": {
											value: 3,
											text: "Thứ tư"
										},
										"thursday": {
											value: 4,
											text: "Thứ năm"
										},
										"friday": {
											value: 5,
											text: "Thứ sáu"
										},
										"saturday": {
											value: 6,
											text: "Thứ bảy"
										},
										"sunday": {
											value: 7,
											text: "Chủ nhật"
										},
									}
									return (
										<div>
											<div className="course-wrapper__main-content__text">
												{classData.name}
												{/* <RegisterBtn /> */}
											</div>
											<div className="course-wrapper__main-content__trainer-info">
												{classData.class.teacher ? <TrainerInfo trainerInfo={classData.class.teacher} /> : null}
											</div>
											<div className="course-wrapper__main-content__classes">
												{
													classData.items.sort(function (a, b) {
														return sorter[a.dayOfWeek].value - sorter[b.dayOfWeek].value
													}).map((timeTableItem, index) => {
														return (
															<div key={index} className="course-wrapper__main-content__classes__yogaclass">
																<h4>{sorter[timeTableItem.dayOfWeek].text}</h4>
																<h4>{timeTableItem.startTime.hour}:{timeTableItem.startTime.minute === 0 ? "00" : timeTableItem.startTime.minute} - {timeTableItem.endTime.hour}:{timeTableItem.endTime.minute === 0 ? "00" : timeTableItem.endTime.minute}</h4>
																{/* 			
																<p>{yogaclass.teacher}</p> */}
															</div>
														);
													})
												}
											</div>
										</div>
									);
								}) : null
							}
						</div>

						<div className="course-wrapper__sub-content">
							{/* <div className="course-wrapper__sub-content__search">
								<SearchBox type='search' />
							</div> */}
							<div className="course-wrapper__sub-content__social-group">
								{this.props.setting.social ? <SocialGroup social={this.props.setting.social} /> : null}
							</div>
							<div className="course-wrapper__sub-content__other-courses">
								<div className="course-wrapper__sub-content__other-courses__text">
									Các khoá học
                				</div>
								{
									this.props.courses.items.map((course) => {
										return (
											<div className="course-wrapper__sub-content__other-courses__course">
												<Link href={`/course/course?slug=${course.slug}`} as={`/khoa-hoc/${course.slug}`}>
													<a href={`/khoa-hoc/${course.slug}`} >
														{course.name}
													</a>
													{/* {course.name} ({course.classes}) */}
												</Link>
											</div>
										)
									})
								}
							</div>
							<div className="course-wrapper__sub-content__latest-posts">
								<div className="course-wrapper__sub-content__other-courses__text">
									bài viết
                				</div>
								{
									this.state.latestNews.map((post, index) => {
										return (
											<div key={index} className="course-wrapper__sub-content__latest-posts__post">
												<LatestPost latestPost={post} />
											</div>
										);
									})
								}
							</div>
							<div className="course-wrapper__sub-content__email">
								<div className="course-wrapper__sub-content__other-courses__text">
									Liên hệ
               					 </div>
								<p>Liên hệ để biết thêm thông tin về khoá học của chúng tôi.</p>
								<SearchBox type='email' />
							</div>

						</div>
					</div>
					<div className="course__contact-us">
						<ContactUs {...this.props.setting.contact} addContact={this.addContact} courses={this.props.courses.items} defaultCourse={this.props.course} />
					</div>
				</React.Fragment>
				<div className="course__footer">
					<Footer {...this.props.setting.contact} logo={this.props.setting.logo} social={this.props.setting.social} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};
const mapDispatchToProps = dispatch => bindActionCreators({
	fetchCourse: action.course.fetch,
	fetchSetting: action.setting.fetch,
	fetchTimeTableOfCourse: action.course.getTimeTableOfCourse,
	fetchNewCategory: action.newCategory.fetch,
	addContact: action.contact.add,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Course);
