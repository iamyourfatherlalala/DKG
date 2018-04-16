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
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react';
import { browserHistory, Redirect } from 'react-router';
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

class SchemeQueryByConcept extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputConcept: '',
            RelationsByConcept: []
        }
        this.getInputConcept = this.getInputConcept.bind(this);
        this.getRelationsByConcept = this.getRelationsByConcept.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
    }

    getInputConcept(e, { name, value }) {
        this.setState({ [name]: value });
    }

    getRelationsByConcept() {
        const { inputConcept, RelationsByConcept } = this.state;
        let proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        let url = `http://106.14.134.97/DKGBackend/relation/${inputConcept}`;
        console.log(inputConcept);
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
                    this.setState({ RelationsByConcept: data });
                    // alert(this.state.exam_conditions[0].id);
                });
            }).catch((error) => {
                console.log(error);
            });
        this.setState({ inputConcept: '' });
        console.log('12345678900987654321');
    }

    onDeleteRow(row) {            
        //      /relation/概念名/关系名/概念名
        let data_remained = this.state.RelationsByConcept;
        let temp = {
            FROMCONCEPT: '',
            RELATION: '',
            TOCONCEPT: ''
        };
        console.log(data_remained);  /////////////////////////////////////////////////////////
        data_remained = data_remained.filter((data) => {
            if(data.id === row[0]){
                temp.FROMCONCEPT = data['fromConcept'];
                temp.RELATION = data['relation'];
                temp.TOCONCEPT = data['toConcept'];
                
            } else{
                return data.id !== row[0];
            }
        });
        
        console.log('opps!!!!!!!!!!'+temp.FROMCONCEPT); ////////////////////////////////

        console.log(data_remained);  /////////////////////////////////////////////////////////
        let proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        let url = `http://106.14.134.97/DKGBackend/relation/${temp.FROMCONCEPT}/${temp.RELATION}/${temp.TOCONCEPT}`;
 
        console.log(url);  /////////////////////////////////////////////////////////

        fetch((proxyurl + url), {
            method: 'DELETE',
            // credentials: 'same-origin'    
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                    if(response){
                    console.log(response);  /////////////////////////////////////////////////////////
                    this.setState({ RelationsByConcept: data_remained });
                    console.log(data_remained);  /////////////////////////////////////////////////////////
                    } else{
                        alert('删除失败');
                    }
                    // alert(this.state.exam_conditions[0].id);
                
            }).catch((error) => {
                console.log(error);
            });
        this.setState({ inputConcept: '' });
        console.log('2333333333333333333333333333');  /////////////////////////////////////////////////////////

    }

    render() {
        const { inputConcept, RelationsByConcept } = this.state;
        return (
            <div>
                <div>
                    <Form onSubmit={this.getRelationsByConcept}>
                        <Form.Group>
                            <Form.Input placeholder='请输入概念名' name='inputConcept' value={this.state.inputConcept} onChange={this.getInputConcept} />
                            <Form.Button content='搜索' />
                        </Form.Group>
                    </Form>
                </div>

                <div className='col-md-offset-1 col-md-8'>
                    <div className='panel panel-default'>
                        {/* <div className='panel-heading'>Remote Delete Row Example</div> */}
                        <div className='panel-body'>
                            <BootstrapTable data={RelationsByConcept}
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

export default SchemeQueryByConcept;