import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { Link } from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>登录</h1>
                    <p className="text-muted">欢迎访问知识图谱管理系统</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="用户名"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="密码"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={ ()=> this.props.history.push('/concept') } color="primary" className="px-4">登录</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">忘记密码?</Button>
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
