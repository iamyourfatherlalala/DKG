import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

import 'semantic-ui-css/semantic.min.css';

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login}/>
      <Route exact path="/register" name="Register Page" component={Register}/>
      <Route exact path="/404" name="Page 404" component={Page404}/>
      <Route exact path="/500" name="Page 500" component={Page500}/>
      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));


// ReactDOM.render((
//   <HashRouter>
//     <Switch>
//       <Route path="/" component={Login}>
//         <Route path="/home" name="Home" component={Full}/>
//       </Route>
//     </Switch>
//   </HashRouter>
// ), document.getElementById('root'));

{/* <Route path="/" component={App}>
  <IndexRoute component={HomePage} />
  <Route path="t/:tid" component={TopicPage} />
  <Route path="t/:tid/edit" component={TopicEditPage} />
  <Route path="c" component={CafesPage} />
  <Route path="c/:slug" component={CafePage} />
  <Route path="c/:slug/create" component={TopicCreatePage} />
  <Route path="u/:username" component={UserPage} />
</Route> */}
