import * as React from 'react'
import './_error.scss'
import Link from 'next/link'
import { CloudImage } from '../../components';

export default class NotFound extends React.Component {
    constructor(pros) {
        super(pros)
    }

    render() {
        return (
            <div className="__error">
                {/* <div>
                    <CloudImage src="/img/error-404.png" alt="404 not found" />
                </div>
                <div>
                    <span>Xin lỗi, trang bạn yêu cầu hiện không tìm thấy</span>
                    <div className="btns">
                        <Link href="/">
                            <button type="button">Trang chủ</button>
                        </Link>
                        <Link href="/lien-he" >
                            <button type="button">Liên hệ</button>
                        </Link>
                    </div>
                </div>
                <span id="pegasus">Designed by Pegasus</span> */}
                <h1>404 Error</h1>
                <p className="zoom-area">Xin lỗi, trang bạn yêu cầu hiện không tìm thấy 😥😥😥</p>
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
                <div className="btns">
                    <Link href="/">
                        <button type="button">Trang chủ</button>
                    </Link>
                    <Link href="/lien-he" >
                        <button type="button">Liên hệ</button>
                    </Link>
                </div>
            </div>
        );
    }
}