import * as React from "react";

import Head from "next/head";
import Link from "next/link";
import { connect } from "react-redux";
import { api } from "../../services";
import { action } from "../../actions";

import "./allCourses.scss";
import { Header, Footer, IntroHome2, ContactUs, TrainingClass } from "../../components";

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
	componentDidMount() {
		this.handleScroll();
		window.addEventListener("scroll", this.handleScroll);

		var heightOfFooter = $(".all-courses__footer .footer-wrapper").height();
		$(".all-courses__contactUs").css("margin-bottom", heightOfFooter + "px");
	}
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
					<div claasName='all-courses__main-content'>
						<div className="all-courses__main-content">
							{
								this.state.trainingClasses.map(trainingClass => {
									return (
										<div className="all-courses__main-content__item">
											<TrainingClass trainingClass={trainingClass} />
										</div>
									)
								})
							}
						</div>

					</div>
					<div className="all-courses__contactUs">
						<ContactUs />
					</div>

					<div className="all-courses__footer">
						<Footer />
					</div>
				</React.Fragment>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(AllCourses);
