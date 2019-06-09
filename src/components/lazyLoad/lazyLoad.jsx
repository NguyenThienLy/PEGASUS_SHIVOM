import { Component } from 'react';
import './lazyLoad.scss'

function elementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0
        && rect.left >= 0
        && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
}


export class LazyLoadComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            LLComponent: null
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

    async handleScroll() {
        console.log("in view port: ", elementInViewport(this.imgElm))
        if (!this.state.loaded && elementInViewport(this.imgElm)) {
            console.log("load component: ")
            // Load real component
            const { default: Component } = await import('../footer/footer');

            this.setState({
                loaded: true,
                LLComponent: Component
            });
        }
    }

    render() {
        const width = this.props.width || '100%';
        const height = this.props.height || '100%';
        return (
            <div ref={imgElm => this.imgElm = imgElm}>
                {this.state.LLComponent ? <this.state.LLComponent /> : <div class="box-loading">
                    <div class="box-thumbnail"></div>

                    <div class="box-line-sm"></div>
                    <div class="box-line-xs"></div>

                    <div class="box-line-df"></div>
                    <div class="box-line-lgx"></div>
                    <div class="box-line-lg"></div>
                </div>}
            </div>
        )
    }
}

