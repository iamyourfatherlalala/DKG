import React, { Component } from 'react';
import {
    Badge,
    Form,
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
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import Scheme from '../Scheme';
//import DeleteRow from '../DeleteRow';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//import BootstrapTable from 'react-bootstrap-table-next';
// import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
// import RemoteStoreDeleteRow from './remote-store-delete-row';

import 'semantic-ui-css/semantic.min.css';
import { Input, Menu, Segment, Button } from 'semantic-ui-react'

import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

// let data = [];

class SchemeAllRelations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllRelations: [],
        }
        this.getAllRelations = this.getAllRelations.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
    }

    componentWillMount() {
        this.getAllRelations();
    }

    getAllRelations() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        const url = "http://106.14.134.97/DKGBackend/relation";
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
                    var id = "id";
                    for (let i = 0; i < data.length; i++) {
                        data[i][id] = i.toString();
                    }
                    console.log(data);
                    this.setState({ AllRelations: data });
                    // alert(this.state.exam_conditions[0].id);
                });
            }).catch((error) => {
                console.log(error);
            });
    }

    onDeleteRow(row) {
        let local_data = this.state.AllRelations;
        local_data = local_data.filter((data) => {
            return data.id !== row[0];
        });

        this.setState({
            AllRelations: local_data
        });
    }

    render() {
        const { AllRelations } = this.state;
        return (
            <div>
                <Button primary onClick={this.getAllRelations}>刷新</Button>

                <div className='col-md-offset-1 col-md-8'>
                    <div className='panel panel-default'>
                        {/* <div className='panel-heading'>Remote Delete Row Example</div> */}
                        <div className='panel-body'>
                            {/* <RemoteStoreDeleteRow /> */}
                            {/* <DeleteRow onDeleteRow={this.onDeleteRow} {...this.state} /> */}
                            <BootstrapTable data={AllRelations}
                                remote={true}
                                deleteRow={true}
                                selectRow={{ mode: 'radio' }}
                                options={{ onDeleteRow: this.onDeleteRow }}>
                                <TableHeaderColumn dataField='id' isKey={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField='fromConcept'>概念</TableHeaderColumn>
                                <TableHeaderColumn dataField='relation'>关系</TableHeaderColumn>
                                <TableHeaderColumn dataField='toConcept'>概念</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SchemeAllRelations;