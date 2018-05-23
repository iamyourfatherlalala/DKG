import React, { Component } from 'react';
import Scheme from '../Scheme';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Input, Menu, Segment, Search, Form, Header, Modal, Table } from 'semantic-ui-react';
// import { Pagination } from 'antd';
// import 'antd/dist/antd.css';

const data = [
    {
        "id": 1,
        "data": "000",
        "code": "000",
        "title": "000"
    },
    {
        "id": 2,
        "data": "111",
        "code": "111",
        "title": "111"
    },
    {
        "id": 3,
        "data": "222",
        "code": "222",
        "title": "222"
    },
];

class MyRow extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
      }

    onClick(e) {
        const { onClick, rowId, data } = this.props;
        onClick(rowId, e);
        console.log(data);
    }

    render() {
        const { data, active } = this.props;
        return (
            <Table.Row onClick={this.onClick} active={active}>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.date}</Table.Cell>
                <Table.Cell >{data.code}</Table.Cell>
                <Table.Cell >{data.title}</Table.Cell>
            </Table.Row>
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

                        <Modal size="large" trigger={
                            // <Table.Body>
                            //     {allData.map(data => <Table.Row key={data.id} onClick={this.handleRowClick(data)}>
                            //         <Table.Cell children={data.id}></Table.Cell>
                            //         <Table.Cell children={data.date}></Table.Cell>
                            //         <Table.Cell children={data.code}></Table.Cell>
                            //         <Table.Cell children={data.title}></Table.Cell>
                            //     </Table.Row>)}
                            // </Table.Body>
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

                        }>

                            <Modal.Header>Profile Picture</Modal.Header>

                            <Modal.Content>
                                <Modal.Description>
                                    <Header>Modal Header</Header>
                                    <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
                                    <a className="ui blue button" id="m-a" target="_blank">下载公告</a>
                                    <button className="ui green button" id="m-ner">实体识别</button>
                                    <Button primary>
                                        Proceed <Icon name='right chevron' />
                                    </Button>
                                </Modal.Description>
                            </Modal.Content>

                            <Modal.Actions>
                
                            </Modal.Actions>

                        </Modal>
                    </Table>
                </div>

                {/* <div>
                    <Table selectable sortable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell sorted="descending">公告id</Table.HeaderCell>
                                <Table.HeaderCell>日期</Table.HeaderCell>
                                <Table.HeaderCell>代码</Table.HeaderCell>
                                <Table.HeaderCell>标题</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
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
                    </Table>
                </div> */}

            </div>
        )
    }
}