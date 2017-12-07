import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import App from './components/App';
import PageLogin from './components/PageLogin';
import PageRegister from './components/PageRegister';
import PageForgetPassword from './components/PageForgetPassword';
import PageMoreInfo from './components/PageMoreInfo';
import './index.less';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PageLogin} />
            <Route path="MyCar" component={PageMoreInfo} />
            <Route path="UseHelp" component={PageForgetPassword} />
            <Route path="MoreOptions" component={PageLogin} />
        </Route>
        <Route path="/login" component={PageLogin} />
        <Route path="/register" component={PageRegister} />
        <Route path="/forgetPassword" component={PageForgetPassword} />
        <Route path="/PageMoreInfo" component={PageMoreInfo} />
    </Router>
    , document.getElementById('example'));