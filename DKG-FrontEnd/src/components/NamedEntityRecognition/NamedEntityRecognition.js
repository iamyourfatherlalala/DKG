import React, { Component } from 'react';
import {
    Badge,
    FormGroup,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Label,
} from 'reactstrap';
import Scheme from '../Scheme';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'semantic-ui-css/semantic.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import '../../css/react-bootstrap-table.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react';
import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

class ActionFormatter extends React.Component {
    render() {
        return (
            <button className='btn btn-info'>Action</button>
        );
    }
}

function actionFormatter(cell, row) {
    return <ActionFormatter />
}

export default class NamedEntityRecognition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AllRelations: [],
            inputValue: ''
        }
        this.getInputValue = this.getInputValue.bind(this);
        this.getNamedEntityRecognition = this.getNamedEntityRecognition.bind(this);
    }

    componentWillMount() {

    }

    getInputValue(e, { name, value }) {
        this.setState({ [name]: value });
    }

    getNamedEntityRecognition() {
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        // const url = "http://106.14.134.97/DKGBackend/relation";
        // fetch((proxyurl + url), {
        //     method: 'GET',
        //     // credentials: 'same-origin'    
        // })
        //     .then(function (response) {
        //         if (!response.ok) {
        //             throw Error(response.statusText);
        //         }
        //         return response;
        //     }).then((response) => {
        //         response.json().then((data) => {
        //             var id = "id";
        //             for (let i = 0; i < data.length; i++) {
        //                 data[i][id] = i.toString();
        //             }
        //             console.log(data);
        //             this.setState({ AllRelations: data });
        //             // alert(this.state.exam_conditions[0].id);
        //         });
        //     }).catch((error) => {
        //         console.log(error);
        //     });
    }

    // onClickProductSelected(cell, row, rowIndex){
    //     console.log('Product #', rowIndex);
    //    }
     
    //    cellButton(cell, row, enumObject, rowIndex) {
    //      return (
    //         <button 
    //            type="button" 
    //            onClick={() => 
    //            this.onClickProductSelected(cell, row, rowIndex)}
    //         >
    //         Click me { rowIndex }
    //         </button>
    //      )
    //   }

    render() {
        const { AllRelations } = this.state;
        const products = [];

        function addProducts(quantity) {
            const startId = products.length;
            for (let i = 0; i < quantity; i++) {
                const id = startId + i;
                products.push({
                    id: id,
                    name: 'Item name ' + id,
                    price: 2100 + i
                });
            }
        }

        addProducts(5);
        return (
            <div>
                <div>
                    <Form onSubmit={this.getNamedEntityRecognition}>
                        <Form.Group>
                            <Form.Input placeholder='请输入名字' name='inputName' value={this.state.inputValue} onChange={this.getInputValue} />
                            <Form.Button content='搜索' />
                        </Form.Group>
                    </Form>
                </div>

                <BootstrapTable data={products}>
                    {/* <TableHeaderColumn dataField='id' isKey hidden export>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='code'>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='data'>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Title</TableHeaderColumn> */}
                    <TableHeaderColumn dataField='id' isKey hidden export>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='action' dataFormat={actionFormatter} export={false}>Action</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}