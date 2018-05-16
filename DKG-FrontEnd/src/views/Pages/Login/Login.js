import React, { Component } from 'react';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      jwt: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { username, password, jwt } = this.state;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
    const url = `http://yangjh.abc6.net:8325/simple/login?usr=${username}&psw=${password}`;

    fetch((proxyurl + url), {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.text();
      }
    })
      .then((JWT) => {
        if (JWT != 'false') {
          const url_validate = `http://yangjh.abc6.net:8325/simple/validate/${JWT}`;
          console.log(url_validate);
          fetch((proxyurl + url_validate), {
            method: 'GET',
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
            })
            .then((login_user) => {
              console.log(login_user);
              console.log(new Date().getTime());
              if (login_user['permit'][1] == '1') {
                localStorage.setItem('jwt', JWT);
                window.location = "https://cner.herokuapp.com/";
               // console.log();
              } 
              else {
                alert('没有权限登入该系统！');
                //return Promise.reject();
              }

            })
            // .catch(err => console.log(err));
        }                                            //to judge if jwt presents for 'false'
        else {
          alert('用户名或者密码输入错误');
         // return Promise.reject();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //  var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    // headers: {
    //   'Authorization': 'Bearer ' + DEMO_TOKEN
    // }

  }

  render() {
    const { username, password, jwt } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>登录</h1>
                    {/* <p className="text-muted">欢迎访问知识图谱管理系统</p> */}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="username" value={username} placeholder="用户名" onChange={this.handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" value={password} placeholder="密码" onChange={this.handleChange} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={this.handleSubmit} color="primary" className="px-4">确认</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0" onClick={() => this.props.history.push('/register')}>注册账号</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>注册</h2>
                      <p>注册一个账号以登录系统</p>
                      <Button color="primary" className="mt-3" active>现在就注册!</Button>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
