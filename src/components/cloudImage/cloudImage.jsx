import { Component } from 'react';
import './cloudImage.scss'

function elementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0
        && rect.left >= 0
        && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
}


export class CloudImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const src = this.props.src
        if(src === undefined){
            return
        }
        if (!this.state.loaded && elementInViewport(this.imgElm)) {
            // Load real image
            const imgLoader = new Image();
            imgLoader.src = src;
            imgLoader.onload = () => {
                const ratioWH = imgLoader.width / imgLoader.height;

                this.imgElm.setAttribute(
                    `src`,
                    `${this.props.src}`
                );

                this.props.keepRatio && this.imgElm.setAttribute(
                    `height`,
                    `${this.props.width / ratioWH}`
                )

                this.imgElm.classList.add(`opacity`);

                this.setState({
                    loaded: true
                });
            }
        }
    }

    render() {
        const width = this.props.width || '100%';
        const height = this.props.height || '100%';

        return (
            <img
                src="https://dummyimage.com/674x384/fff/ffffff.png"
                width={width}
                height={height}
                ref={imgElm => this.imgElm = imgElm}
                className="lazy-image"
                alt={this.props.alt}
            />
        )
        // return (
        //     <img
        //         src={`https://ce83c157c.cloudimg.io/width/800/png-lossy-40/${this.props.src}`}
        //         //src={`https://ce83c157c.cloudimg.io/cdno/30/30/png-lossy-40/${this.props.src}`}
        //         alt={this.props.alt}
        //     />
        // );
    }
}

