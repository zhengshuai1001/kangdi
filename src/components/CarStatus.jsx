import React from 'react';
import { runPromise } from '../common/promise';

export default class CarStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carStatus: {}
        }
    }
    getChildContext() {
        return { carStatus: this.state.carStatus }
    }
    componentDidMount() {
        let a = 0;
        // setInterval(() => {
        //     a++;
        //     this.setState({
        //         bb: a
        //     })
        // }, 1000)
    }
    render() {
        return (
            <div className="car-status-box" >
                {this.props.children && React.cloneElement(this.props.children, this.state)}
            </div>
        )
    }
}

CarStatus.childContextTypes = {
    carStatus: React.PropTypes.object
};