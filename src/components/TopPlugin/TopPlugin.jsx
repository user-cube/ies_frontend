import React, {Component} from "react";

class TopPlugin extends Component {

    constructor() {
        super();
        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - "50");
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), "17");
        this.setState({intervalId: intervalId});
    }

    render() {
        return (
            <div className="fixed-scroll">
                <div onClick={() => {
                    this.scrollToTop();
                }}>
                    <i className="fas fa-arrow-up fa-2x"/>
                </div>
            </div>
        );
    }
}

export default TopPlugin;
