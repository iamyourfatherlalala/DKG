import React, { Component } from 'react';
import Scheme from '../Scheme';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Input, Menu, Segment, Search, Form, Header, Modal, Table } from 'semantic-ui-react';
// import { Pagination } from 'antd';
// import 'antd/dist/antd.css';

function make_output(text, response, html) {
    html.text('');
    let begin = 0;
    response.forEach(function (value) {
        html.append(text.slice(begin, value[0]));
        let span = text.slice(value[0], value[1]);
        html.append(`<span class="${value[2]}">${span}</span>`);
        begin = value[1];
    });
    html.append(text.slice(begin));
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
                    console.log(data);
                    this.setState({ Modal_content: data['content'] });
                });
            }).catch((error) => {
                console.log(error);
            });
        console.log(data);
    }

    showContent() {
        const { Modal_id, Modal_title, Modal_date, Modal_url, Modal_content } = this.state;
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

               //     make_output(Modal_content, response, content);
             

                    console.log(data);
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { Modal_id, Modal_title, Modal_date, Modal_url, Modal_content } = this.state;
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

                <Modal.Content scrolling style={{ whiteSpace: 'pre-wrap' }}>
                    <Modal.Description>
                        <Header>{Modal_title}</Header>
                        <p>{Modal_date}</p>
                        <a className="ui blue button" href={'http://www.cninfo.com.cn/' + Modal_url} target="_blank">下载公告</a>
                        <button className="ui green button" id="m-ner" onClick={this.showContent}>实体识别</button>
                    </Modal.Description>
                    {Modal_content}
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
            activeRows: []
        }
        this.getInputValue = this.getInputValue.bind(this);
        this.getNamedEntityRecognition = this.getNamedEntityRecognition.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    componentWillMount() {

    }

    getInputValue(e, { name, value }) {
        this.setState({ [name]: value });
    }

    getNamedEntityRecognition() {
        const { allData, inputValue, activeRows } = this.state;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        const url = `http://cner.herokuapp.com/query?code=${inputValue}&page=1&limit=20`
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
        const { allData, inputValue, activeRows } = this.state;

        return (
            <div>
                <div>
                    <Form onSubmit={this.getNamedEntityRecognition}>
                        <Form.Group>
                            <Form.Input placeholder='请输入名字' name='inputValue' value={this.state.inputValue} onChange={this.getInputValue} />
                            <Form.Button content='搜索' />
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

                        {/* // }>

                        //     <Modal.Header>Profile Picture</Modal.Header>

                        //     <Modal.Content>
                        //         <Modal.Description>
                        //             <Header>Modal Header</Header>
                        //             <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
                        //             <a className="ui blue button" id="m-a" target="_blank">下载公告</a>
                        //             <button className="ui green button" id="m-ner">实体识别</button>
                        //         </Modal.Description>
                        //     </Modal.Content>

                        //     <Modal.Actions>
                
                        //     </Modal.Actions>

                        // </Modal> */}
                    </Table>
                </div>

            </div>
        )
    }
}