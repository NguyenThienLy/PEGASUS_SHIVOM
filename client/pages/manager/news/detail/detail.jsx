import * as React from "react";
import { action } from '../../../../actions'
import { api } from '../../../../services'
import { SetSlider } from './components'
import Swal from 'sweetalert2'

export class DetailNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {},
            modals: {
                setSlider: true
            }
        }
        this.setSlider = this.setSlider.bind(this)
    }

    async componentDidMount() {
        let news = this.props.news.items.find((news) => { return news._id === this.props.params.newsId })
        if (!news) {
            const res = await api.news.getItem(this.props.params.newsId)
            news = res.result.object
        }
        this.setState({ news: news })

    }

    showHideModal(key) {
        this.state.modals[key] = !this.state.modals[key]
        this.setState({ modals: this.state.modals })
    }

    async setSlider(body) {
        Swal.showLoading()
        body.image = await api.imgur.uploadImage(body.image)
        api.news.setSlider(this.props.params.newsId, body, {
            headers: {
                "x-token":
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
        }).then(res => {
            Swal.fire("Thành công", "Thiết lập slider thành công", "success")
        }).catch(err => {
            Swal.fire("Thất bại", "Thiết lập slider thất bại", "error")
        })
    }
    render() {

        return (
            <React.Fragment>
                <SetSlider show={this.state.modals.setSlider} hideModal={() => { this.showHideModal("setSlider") }} setSlider={this.setSlider} />
                <div>
                    <h1>{this.state.news.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: this.state.news.content }}></div>
                </div>
            </React.Fragment >
        );
    }
}
