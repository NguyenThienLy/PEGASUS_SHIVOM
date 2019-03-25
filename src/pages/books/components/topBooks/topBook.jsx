import * as React from 'react'
import './topBook.scss'

import { BookItem } from '../../../../components'

import Router from 'next/router'

export class TopBooks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    onClickOnBook(slug) {
        Router.push(`/sach/${slug}`);
    }
    render() {
        return (
            <div className="top-book">
                <div className="top-book-select">
                    <span>Kinh tế</span>
                    <span>Văn học</span>
                    <span>Đời sống</span>
                    <span>Kỹ năng</span>
                </div>
                <div className="top-books">
                    <div className="top-books-row">

                        <BookItem
                            img="https://www.nxbtre.com.vn/Images/Book/nxbtre_full_10352018_093557.jpg"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                        <BookItem
                            img="https://bizweb.dktcdn.net/100/197/269/products/lam-ra-lam-choi-ra-choi.jpg?v=1549868667403"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                        <BookItem
                            img="https://bizweb.dktcdn.net/100/197/269/products/com-bo-tam-ly-hoc.jpg?v=1550046079353"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                        <BookItem
                            img="https://bizweb.dktcdn.net/100/197/269/products/combo-sketchnote.png?v=1552291129710"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                    </div>
                    <hr/>
                    <div className="top-books-row">

                        <BookItem
                            img="https://bizweb.dktcdn.net/100/197/269/products/dai-tieu-thu-crazy-rich-asians-2-bia-truoc.png?v=1552028974110"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                        <BookItem
                            img="https://bizweb.dktcdn.net/100/197/269/products/em-se-nuoi-con-chung-ta.jpg?v=1552969280567"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                        <BookItem
                            img="https://bizweb.dktcdn.net/100/197/269/products/ban-cong-nha-no-co-hanh-phuc-vua-roi.jpg?v=1552965544883"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                        <BookItem
                            img="https://bizweb.dktcdn.net/100/197/269/products/chuyen-dan-ba-02.jpg?v=1552965318457"
                            title="Tạo lập mô hình kinh doanh"
                            author="Philip Kolter" 
                            handleClick={() => { this.onClickOnBook("tao-lap-mo-hinh-kinh-doanh")}}/>
                    </div>
                </div>
            </div>
        )
    }
}