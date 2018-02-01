import React from 'react';
import { hashHistory } from 'react-router';
import { TabBar } from 'antd-mobile';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'app',
            selectedTab: "/MyCar"
        };
    }
    componentWillMount() {
        let token = localStorage.getItem("token");
        if (!token) {
            this.context.router.push('/login');
        } else {
            this.setState({
                selectedTab: this.props.location.pathname
            });
        }
    }
    shouldComponentUpdate() {
        return this.props.router.location.action === 'POP';
    }
    render() {
        return (
            <div className="container-app">
                <TabBar
                    barTintColor="transparent"
                    unselectedTintColor="#fff"
                    tintColor="#cf2a89"
                >
                    <TabBar.Item
                        title="我的车辆"
                        key="MyCar"
                        icon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-MyCar.png')} />}
                        selectedIcon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-MyCar-selected.png')} />}
                        selected={this.state.selectedTab === '/MyCar'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/MyCar',
                            });
                            // this.context.router.push("/MyCar");
                            hashHistory.replace("/MyCar");
                        }}
                    ></TabBar.Item>
                    <TabBar.Item
                        title="使用帮助"
                        key="UseHelp"
                        icon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-UseHelp.png')} />}
                        selectedIcon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-UseHelp-selected.png')} />}
                        selected={this.state.selectedTab === '/UseHelp'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/UseHelp',
                            });
                            // this.context.router.push("/UseHelp");
                            hashHistory.replace("/UseHelp");
                        }}
                    ></TabBar.Item>
                    <TabBar.Item
                        title="更多设置"
                        key="MoreOptions"
                        icon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-MoreOptions.png')} />}
                        selectedIcon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-MoreOptions-selected.png')} />}
                        selected={this.state.selectedTab === '/MoreOptions'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '/MoreOptions',
                            });
                            // this.context.router.push("/MoreOptions");
                            hashHistory.replace("/MoreOptions");
                        }}
                    ></TabBar.Item>
                </TabBar>
                {this.props.children && React.cloneElement(this.props.children, { carStatus: this.props.carStatus, queryCarStatus: this.props.queryCarStatus})}
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};