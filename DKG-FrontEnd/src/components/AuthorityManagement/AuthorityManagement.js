require('./AuthorityManagement.css');
import React, {Component} from 'react';
import App from './app';

class AuthorityManagement extends Component {
    render() {
        return (
          <div className='col-md-offset-1 col-md-8'>
            <div className='panel panel-default'>
              {/* <div className='panel-heading'>A Complex Example</div> */}
              <h5>用户管理</h5>
              <div className='panel-body'>
                <App />
              </div>
            </div>
          </div>
        );
    }
}

export default AuthorityManagement;