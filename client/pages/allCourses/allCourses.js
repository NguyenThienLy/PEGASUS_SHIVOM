import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";
import { bindActionCreators } from 'redux'

import "./allCourses.scss";
import {
	Header,
	Footer,
	IntroHome2,
	ContactUs,
	TrainingClass,
	SearchBox,
	LatestPost
} from "../../components";
import { SocialGroup } from "../../components/footer/socialGroup/socialGroup"

import GoogleMapReact from "google-map-react";

export class AllCourses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			trainingClasses: [
				{
					category: "fitness",
					name: "chạy bộ",
					detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
					time: "1 Giờ",
					star: 1,
					love: 800,
					image:
						"https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
					link: "#"
				},
				{
					category: "fitness",
					name: "chạy bộ",
					detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
					time: "1 Giờ",
					star: 1,
					love: 800,
					image:
						"https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
					link: "#"
				},
				{
					category: "fitness",
					name: "chạy bộ",
					detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
					time: "1 Giờ",
					star: 1,
					love: 800,
					image:
						"https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
					link: "#"
				},
				{
					category: "fitness",
					name: "chạy bộ",
					detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
					time: "1 Giờ",
					star: 1,
					love: 800,
					image:
						"https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
					link: "#"
				}
			],
			categories: [
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
			latestNews: []
		};
	}
	static async getInitialProps({ req, query }) {
		return {};
	}

	handleScroll = () => {
		var x = $(window).scrollTop();
		$(".all-courses .all-courses__title").css(
			"background-position",
			"center " + parseInt(-x / 2.8) + "px"
		);
	};

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
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
	componentDidMount() {
		this.fetchData()
		this.handleScroll();
		window.addEventListener("scroll", this.handleScroll);

		var heightOfFooter = $(".all-courses__footer .footer-wrapper").height();
		$(".all-courses__contactUs").css("margin-bottom", heightOfFooter + "px");
		this.getLatestNews()
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
	addContact = body => {
		this.props.addContact(body);
	};
	render() {
		return (
			<div className="all-courses">
				<Head>
					<title>Các khoá học</title>
					<meta name="title" content="Các khoá học" />
					<meta
						name="description"
						content="Các khoá học của trung tâm yoga Hiệp Hoà"
					/>
				</Head>
				<React.Fragment>
					<div className="all-courses__header">
						<Header {...this.props} />
					</div>
					<div className="all-courses__title">
						<div className="all-courses__title__image">
							<img src='https://dalia.elated-themes.com/wp-content/uploads/2018/07/spa-slider-1.jpg'></img>
							<div className="all-courses__title__image__info">
								<div>các khoá học </div>
								<p>
									Tham khảo các khoá học hiện có của Hiệp Hoà Yoga.
                			</p>
							</div>
						</div>
						<div className="all-courses__title__inner">
							<div>các khoá học</div>
							<p>
								Tham khảo các khoá học hiện có của Hiệp Hoà Yoga.
              			</p>
						</div>
					</div>
					<div className="all-courses__wrapper">
						<div className="all-courses__wrapper__main-content">
							{this.props.courses.fetching === false
								? this.props.courses.items.map(trainingClass => {
									return <TrainingClass trainingClass={trainingClass} />;
								})
								: null}
						</div>
						<div className="all-courses__wrapper__sub-content">
							<div className="all-courses__wrapper__sub-content__search">
								<SearchBox type='search' />
							</div>
							<div className="all-courses__wrapper__sub-content__social-group">
								{this.props.setting.social ? <SocialGroup social={this.props.setting.social} /> : null}
							</div>
							<div className="all-courses__wrapper__sub-content__categories">
								<div className="all-courses__wrapper__sub-content__categories__text">
									Thể loại
                	                </div>
								{
									this.props.newCategories.items.map((category) => {
										return (
											<div className="all-courses__wrapper__sub-content__categories__category">
												<Link href={`/blog/blog?categorySlug=${category.slug}`} as={`/${category.slug}`}>
													<a href={`/${category.slug}`} >
														{category.name}
													</a>
													{/* {course.name} ({course.classes}) */}
												</Link>
											</div>
										)
									})
								}

							</div>
							<div className="all-courses__wrapper__sub-content__latest-posts">
								<div className="all-courses__wrapper__sub-content__categories__text">
									bài viết
                	                </div>
								{
									this.state.latestNews.map((post, index) => {
										return (
											<div key={index} className="post__wrapper__sub-content__latest-posts__post">
												<LatestPost latestPost={post} />
											</div>
										);
									})
								}
							</div>
							<div className="all-courses__wrapper__sub-content__email">
								<div className="all-courses__wrapper__sub-content__categories__text">
									Liên hệ
               		                </div>
								<p>Liên hệ để biết thêm thông tin về khoá học của chúng tôi.</p>
								<SearchBox type='email' />
							</div>
						</div>


					</div>
					<div className="all-courses__contactUs">
						<ContactUs
							{...this.props.setting.contact}
							addContact={this.addContact}
							courses={this.props.courses.items}
						/>
					</div>

					<div className="all-courses__footer">
						<Footer {...this.props.setting.contact} logo={this.props.setting.logo} social={this.props.setting.social} />
					</div>
				</React.Fragment>
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
	fetchNewCategory: action.newCategory.fetch,
	addContact: action.contact.add,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AllCourses);
