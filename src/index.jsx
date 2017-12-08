import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import App from './components/App';
import PageLogin from './components/PageLogin';
import PageRegister from './components/PageRegister';
import PageForgetPassword from './components/PageForgetPassword';
import PageMoreInfo from './components/PageMoreInfo';
import PageUseHelp from './components/PageUseHelp';
import PageFeedback from './components/PageFeedback';
import PageSettings from './components/PageSettings';
import PagePersonalCenter from './components/PagePersonalCenter';
import PageModifyPassword from './components/PageModifyPassword';
import PageContactUs from './components/PageContactUs';

import './index.less';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PageLogin} />
            <Route path="MyCar" component={PageLogin} />
            <Route path="UseHelp" component={PageUseHelp} />
            <Route path="MoreOptions" component={PageSettings} />
        </Route>
        <Route path="/login" component={PageLogin} />
        <Route path="/register" component={PageRegister} />
        <Route path="/forgetPassword" component={PageForgetPassword} />
        <Route path="/moreInfo" component={PageMoreInfo} />
        <Route path="/feedback" component={PageFeedback} />
        <Route path="/personalCenter" component={PagePersonalCenter} />
        <Route path="/modifyPassword" component={PageModifyPassword} />
        <Route path="/contactUs" component={PageContactUs} />
    </Router>
    , document.getElementById('example'));