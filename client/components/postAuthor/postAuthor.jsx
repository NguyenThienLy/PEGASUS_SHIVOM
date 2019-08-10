import * as React from 'react'
import './postAuthor.scss'

export class PostAuthor extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="post-author">
                <div className="post-author__avatar">
                    <a href="#">
                        <img 
                            src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-5a.jpg"
                            alt="author's avatar"
                        ></img>
                    </a>
                </div>
                <div className="post-author__info">
                    <div className="post-author__info__type">giáo viên</div>
                    <div className="post-author__info__name">
                        <a href="#">
                            ngọc hạnh
                        </a>
                    </div>
                    <div className="post-author__info__description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Repudiandae, distinctio, eveniet eaque et, sapiente hic tempora repellat deserunt odit iure recusandae? Architecto, quisquam.
                    </div>
                </div>
            </div>
        )
    }
}