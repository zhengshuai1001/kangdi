import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';

import App from './components/App';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import PageLogin from './components/PageLogin';
import PageRegister from './components/PageRegister';
import PageForgetPassword from './components/PageForgetPassword';
import PageMoreInfo from './components/PageMoreInfo';
import './index.less';

class Index extends React.Component {
  render() {
    return (
      <div className="body">
        <h1>Stages list</h1>
        <ul role="nav">
          <li><Link to="/s1">ListView8 + Carousel</Link></li>
          <li><Link to="/s2">Tabs + ...</Link></li>
          <li><Link to="/s3">Form + ...</Link></li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="s1" component={Stage1} />
      <Route path="s2" component={Stage2} />
      <Route path="s3" component={Stage3} />
    </Route>
    <Route path="/login" component={PageLogin} />
    <Route path="/register" component={PageRegister} />
    <Route path="/forgetPassword" component={PageForgetPassword} />
    <Route path="/PageMoreInfo" component={PageMoreInfo} />
  </Router>
, document.getElementById('example'));

// ReactDOM.render(
//   <div className="body">
//     <h1>Stages list</h1>
//     <ul role="nav">
//       <li><h3>ListView + Carousel</h3></li>
//       <li><h3>Tabs + ...</h3></li>
//       <li><h3>Form + ...</h3></li>
//     </ul>
//     <App><Stage3 /></App>
//   </div>
// , document.getElementById('example'));