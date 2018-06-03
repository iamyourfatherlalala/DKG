import React, { Component } from 'react';
import Scheme from '../Scheme';
import NamedEntityRecognition from '../NamedEntityRecognition';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Input, Menu, Segment, Search, Form, Header, Modal, Table } from 'semantic-ui-react';
import moment from 'moment/src/moment';
//the component which deals with the selection of the table
class MyRow extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
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
        console.log(data);
    }

    render() {
        const { data, active } = this.props;
        return (
                <Table.Row onClick={this.onClick} active={active}>
                    <Table.Cell>{data.id}</Table.Cell>
                    <Table.Cell>{data.fullDeclareDate}</Table.Cell>
                    <Table.Cell >{data.title}</Table.Cell>
                </Table.Row>
        );
    }
}

export default class NewsInquiry extends React.Component {
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
        const url = `http://cner.herokuapp.com/query?query_table=news&code=${inputValue}&page=${currentPage}&limit=20&date_end=${end_date}&date_start=${start_date}`
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
                        let temp = data[i]['fullDeclareDate']
                        data[i]['fullDeclareDate'] = moment(temp).format('YYYY-MM-DD hh:mm:ss');
                        console.log(data[i]['fullDeclareDate']);
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
            const url = `http://cner.herokuapp.com/query?query_table=news&code=${inputValue}&page=${newPage}&limit=20&date_end=${end_date}&date_start=${start_date}`
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
                            let temp = data[i]['fullDeclareDate']
                            data[i]['fullDeclareDate'] = moment(temp).format('YYYY-MM-DD hh:mm:ss');
                            console.log(data[i]['fullDeclareDate']);
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
        const url = `http://cner.herokuapp.com/query?query_table=news&code=${inputValue}&page=${newPage}&limit=20&date_end=${end_date}&date_start=${start_date}`
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
                        let temp = data[i]['fullDeclareDate']
                        data[i]['fullDeclareDate'] = moment(temp).format('YYYY-MM-DD hh:mm:ss');
                        console.log(data[i]['fullDeclareDate']);
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
                                <Table.HeaderCell>新闻id</Table.HeaderCell>
                                <Table.HeaderCell>日期</Table.HeaderCell>
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

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
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