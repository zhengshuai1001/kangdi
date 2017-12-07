import React from 'react';
import { hashHistory } from 'react-router';
import { TabBar } from 'antd-mobile';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'app',
            selectedTab: "MyCar"
        };
        this.getCookie = function (name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return decodeURIComponent(arr[2]); return null;
        };
    }
    componentWillMount() {
        let isLogined = this.getCookie("id");
        if (!isLogined) {
            // this.context.router.push('/login');
        }
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
                        selected={this.state.selectedTab === 'MyCar'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'MyCar',
                            });
                            this.context.router.push("/MyCar");
                        }}
                    ></TabBar.Item>
                    <TabBar.Item
                        title="使用帮助"
                        key="UseHelp"
                        icon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-UseHelp.png')} />}
                        selectedIcon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-UseHelp-selected.png')} />}
                        selected={this.state.selectedTab === 'UseHelp'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'UseHelp',
                            });
                            this.context.router.push("/UseHelp");
                        }}
                    ></TabBar.Item>
                    <TabBar.Item
                        title="更多设置"
                        key="MoreOptions"
                        icon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-MoreOptions.png')} />}
                        selectedIcon={<img className="tab-bar-icon-img" src={require('../images/tab-bar-MoreOptions-selected.png')} />}
                        selected={this.state.selectedTab === 'MoreOptions'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'MoreOptions',
                            });
                            this.context.router.push("/MoreOptions");
                        }}
                    ></TabBar.Item>
                </TabBar>
                {this.props.children}
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};