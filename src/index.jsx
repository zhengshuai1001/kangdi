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
import PageMyCarLogin from './components/PageMyCarLogin';
import PageRemoteMeter from './components/PageRemoteMeter';
import PageRemoteControl from './components/PageRemoteControl';
import PageMyCar from './components/PageMyCar';
import PageModifyControlCodeFirst from './components/PageModifyControlCodeFirst';
import PageModifyControlCodeSecond from './components/PageModifyControlCodeSecond';

import { PageUploadAvatar } from './components/uploadAvatar';
import { PageUploadAvatar2 } from './components/uploadAvatar2';

// import errmsg from './data/errmsg';
// console.log(errmsg["100"]);

import './index.less';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PageMyCar} />
            <Route path="MyCar" component={PageMyCar} />
            <Route path="MyCarLogin" component={PageMyCarLogin} />
            <Route path="UseHelp" component={PageUseHelp} />
            <Route path="MoreOptions" component={PageSettings} />
        </Route>
        <Route path="/login" component={PageLogin} />
        <Route path="/register" component={PageRegister} />
        <Route path="/moreInfo" component={PageMoreInfo} />
        <Route path="/forgetPassword" component={PageForgetPassword} />
        <Route path="/feedback" component={PageFeedback} />
        <Route path="/personalCenter" component={PagePersonalCenter} />
        <Route path="/modifyPassword" component={PageModifyPassword} />
        <Route path="/contactUs" component={PageContactUs} />
        <Route path="/remoteMeter" component={PageRemoteMeter} />
        <Route path="/remoteControl" component={PageRemoteControl} />
        <Route path="/uploadAvatar" component={PageUploadAvatar} />
        <Route path="/uploadAvatar2" component={PageUploadAvatar2} />
        <Route path="/modifyControlCodeFirst" component={PageModifyControlCodeFirst} />
        <Route path="/modifyControlCodeSecond" component={PageModifyControlCodeSecond} />
    </Router>
    , document.getElementById('example'));