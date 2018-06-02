import React, { Component } from 'react';
import Scheme from '../Scheme';
import 'semantic-ui-css/semantic.min.css';
import './style.css'
import { Button, Icon, Input, Menu, Segment, Search, Form, Header, Modal, Table } from 'semantic-ui-react';
// import { Pagination } from 'antd';
// import 'antd/dist/antd.css';

function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

//the component which deals with the selection of the table
class MyRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Modal_id: 0,
            Modal_title: '',
            Modal_date: '',
            Modal_url: '',
            Modal_content: '',
            style_array: []
        };
        this.onClick = this.onClick.bind(this);
        this.showContent = this.showContent.bind(this);
    }

    onClick(e) {
        const { onClick, rowId, data } = this.props;
        onClick(rowId, e);
        this.setState({
            Modal_id: data.id,
            Modal_title: data.title,
            Modal_date: data.date,
            Modal_url: data.url,
        });

        console.log(data.id);

        const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        const url = `http://cner.herokuapp.com/detail/${data.id}`
        fetch((proxyurl + url), {
            method: 'GET',
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                response.json().then((data) => {
                  //  console.log(data);
                    this.setState({ Modal_content: data['content'] });
                });
            }).catch((error) => {
                console.log(error);
            });
        console.log(data);
    }

    showContent() {
        const { Modal_id, Modal_title, Modal_date, Modal_url, Modal_content, style_array } = this.state;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `http://cner.herokuapp.com/single2`
        fetch((proxyurl + url), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Modal_content)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                response.json().then((data) => {
                  
                    //console.log(Modal_content);
                    console.log(data);

                    let result_text = '';
                    let fixed_content = Modal_content;
                    console.log(fixed_content);
                    let begin = 0;

                    data.forEach(function (value) {
                        // result_text.append(fixed_content.slice(begin, value[0]));
                        result_text += fixed_content.slice(begin, value[0]);
                        let span = fixed_content.slice(value[0], value[1]);
                        // result_text.append(`<span className="${value[2]}">${span}</span>`);
                        if(value[2] == 'ORG'){
                            result_text += `<span style="background-color: lightpink;">${span}</span>`;
                        }else if(value[2] == 'PER'){
                            result_text += `<span style="background-color: khaki;">${span}</span>`;
                        }else if(value[2] == 'LOC'){
                            result_text += `<span style="background-color: paleturquoise;">${span}</span>`;
                        }
                       
                        begin = value[1];
                    });
                    // result_text.append(fixed_content.slice(begin));
                    result_text += fixed_content.slice(begin);
                    console.log('12345678890' + result_text);
                
                   
                    // console.log(content);

                    this.setState({ style_array: data, Modal_content: result_text });
               
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { Modal_id, Modal_title, Modal_date, Modal_url, Modal_content, style_array } = this.state;
        const { data, active } = this.props;
        return (
            <Modal size="tiny" trigger={
                <Table.Row onClick={this.onClick} active={active}>
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.date}</Table.Cell>
                    <Table.Cell >{data.code}</Table.Cell>
                    <Table.Cell >{data.title}</Table.Cell>
                </Table.Row>
            }>

                <Modal.Header>{Modal_title}</Modal.Header>

                <Modal.Content className="modal" scrolling style={{ whiteSpace: 'pre-wrap' }}>
                    <Modal.Description>
                        <Header>{Modal_title}</Header>
                        <p>{Modal_date}</p>
                        <a className="ui blue button" href={'http://www.cninfo.com.cn/' + Modal_url} target="_blank">下载公告</a>
                        <button className="ui green button" id="m-ner" onClick={this.showContent}>实体识别</button>
                    </Modal.Description>
                    <div dangerouslySetInnerHTML={{__html: Modal_content}} />
                    {/* <div dangerouslySetInnerHTML={{__html: '<span style="background-color: lightpink;">王佳祺是天才</span>'}} /> */}
                    {/* this.state.Modal_content.map(function(value,index,array){<br>//代码片段<br>}.bind(this)) */}
                </Modal.Content>

                {/* <Modal.Actions>

                </Modal.Actions> */}

            </Modal>
        );
    }
}

export default class NamedEntityRecognition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            inputValue: '',
            activeRows: [],
            currentPage: 1,
            start_date: '',
            end_date: ''
        }
        this.getInputValue = this.getInputValue.bind(this);
        this.getNamedEntityRecognition = this.getNamedEntityRecognition.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.moveForward = this.moveForward.bind(this);
        this.moveBack = this.moveBack.bind(this);
    }

    componentWillMount(e) {

    }

    getInputValue(e, { name, value }) {
        this.setState({ [name]: value });
    }

    getNamedEntityRecognition() {
        this.setState({ currentPage: 1 });          // initialize the currentPage
        // this.setState({ currentPage: 1, inputValue: '' });          
        const { allData, inputValue, activeRows, currentPage, start_date, end_date } = this.state;
        console.log(currentPage);
        const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        const url = `http://cner.herokuapp.com/query?code=${inputValue}&page=${currentPage}&limit=20&date_end=${end_date}&date_start=${start_date}`
        fetch((proxyurl + url), {
            method: 'GET',
            // credentials: 'same-origin'    
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                response.json().then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        let date = new Date(data[i]['date']);
                        data[i]['date'] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
                    }
                    console.log(data);
                    this.setState({ allData: data });
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    moveBack() {
        const { allData, inputValue, activeRows, currentPage, start_date, end_date } = this.state;
        if (currentPage > 1) {
            let newPage = currentPage - 1;
            this.setState({ currentPage: newPage });
            const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
            const url = `http://cner.herokuapp.com/query?code=${inputValue}&page=${newPage}&limit=20&date_end=${end_date}&date_start=${start_date}`
            fetch((proxyurl + url), {
                method: 'GET',
                // credentials: 'same-origin'    
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                }).then((response) => {
                    response.json().then((data) => {
                        for (let i = 0; i < data.length; i++) {
                            let date = new Date(data[i]['date']);
                            data[i]['date'] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
                        }
                        console.log(data);
                        this.setState({ allData: data });
                    });
                }).catch((error) => {
                    console.log(error);
                });
        }
    }

    moveForward() {
        const { allData, inputValue, activeRows, currentPage, start_date, end_date } = this.state;
        let newPage = currentPage + 1;
        this.setState({ currentPage: newPage });
        const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        const url = `http://cner.herokuapp.com/query?code=${inputValue}&page=${newPage}&limit=20&date_end=${end_date}&date_start=${start_date}`
        fetch((proxyurl + url), {
            method: 'GET',
            // credentials: 'same-origin'    
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                response.json().then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        let date = new Date(data[i]['date']);
                        data[i]['date'] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
                    }
                    console.log(data);
                    this.setState({ allData: data });
                });
            }).catch((error) => {
                console.log(error);
            });
    }


    onRowClick(id, e) {
        const { activeRows } = this.state;
        const nextRows = {
            // ...activeRows,
            [id]: !activeRows[id]
        }
        this.setState({ activeRows: nextRows });
        // console.log(activeRows);
    }

    render() {
        const { allData, inputValue, activeRows, currentPage, start_date, end_date } = this.state;

        return (
            <div>
                <div>
                    <Form onSubmit={this.getNamedEntityRecognition}>
                        <Form.Group>
                            <Form.Input placeholder='请输入名字' name='inputValue' value={this.state.inputValue} onChange={this.getInputValue} />
                            <div className="ui label date-label">开始时间</div>
                            <Form.Input type="date" name='start_date' value={this.state.start_date} onChange={this.getInputValue} />
                            <div className="ui label date-label">结束时间</div>
                            <Form.Input type="date" name='end_date' value={this.state.end_date} onChange={this.getInputValue} />
                            <Form.Button primary content='搜索' />
                        </Form.Group>
                    </Form>
                </div>

                <div>
                    <Table selectable sortable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>公告id</Table.HeaderCell>
                                <Table.HeaderCell>日期</Table.HeaderCell>
                                <Table.HeaderCell>代码</Table.HeaderCell>
                                <Table.HeaderCell>标题</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        {/* <Modal size="large" trigger={ */}
                        <Table.Body>
                            {
                                allData.map((u) => {
                                    const isActive = activeRows[u.id];
                                    return (
                                        <MyRow
                                            active={isActive}
                                            key={u.id}
                                            rowId={u.id}
                                            data={u}
                                            onClick={this.onRowClick}
                                        />
                                    );
                                })
                            }

                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Menu floated='right' pagination>
                                        <Menu.Item as='button' onClick={this.moveBack} icon>
                                            <Icon name='chevron left' />
                                        </Menu.Item>
                                        <Menu.Item as='button' onClick={this.moveForward} icon>
                                            <Icon name='chevron right' />
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>

            </div>
        )
    }
}