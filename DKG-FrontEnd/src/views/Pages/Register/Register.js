import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { username, password, confirm_password } = this.state;
    if (password != confirm_password) {
      alert('请保持前后输入的密码一致');
      this.setState({username: '', password: '', confirm_password: ''});
    } else {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
      const url = `http://yangjh.abc6.net:8325/simple/add?usr=${username}&psw=${password}`;
      fetch((proxyurl + url), {
        method: 'POST',
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      }).then((user) => {
        window.location = "https://cner.herokuapp.com/";       //document.location.href
      })
      .catch((err) => {
        console.log(err);
      });

    }

  }

  render() {
    const { username, password, confirm_password } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>注册</h1>
                  <p className="text-muted">注册新账号</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="username" value={username} placeholder="用户名" onChange={this.handleChange} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="password" value={password} placeholder="密码" onChange={this.handleChange} />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="confirm_password" value={confirm_password} placeholder="再次确认密码" onChange={this.handleChange} />
                  </InputGroup>
                  {/* <Button color="success" block onClick={()=> this.props.history.push('/content')}>创建账号</Button> */}
                  <Button onClick={this.handleSubmit} color="primary" className="px-4">确认</Button>
                </CardBody>
                <CardFooter className="p-4">
                  {/* <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row> */}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
