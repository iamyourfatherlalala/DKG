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
import Entity from '../Entity';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react';
import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

class EntityQueryByName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            EntityByName: []
        }
        this.getInputName = this.getInputName.bind(this);
        this.getEntityByName = this.getEntityByName.bind(this);
        this.onDeleteRow = this.onDeleteRow.bind(this);
    }

    getInputName(e, { name, value }) {
        this.setState({ [name]: value });
    }

    getEntityByName() {
        const { inputName } = this.state;
        let proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        let url = `http://106.14.134.97/DKGBackend/entity/queryByName/${inputName}`;
        console.log(inputName);
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
                    // var id = "id";
                    // for (let i = 0; i < data.length; i++) {
                    //     data[i][id] = i.toString();
                    // }
                    console.log(data);
                    this.setState({ EntityByName: data });
                    // alert(this.state.exam_conditions[0].id);
                });
            }).catch((error) => {
                console.log(error);
            });
            this.setState({ inputName: '' });
        console.log('12345678900987654321');
    }

    onDeleteRow(row) {
        // let local_data = this.state.RelationsByConcept;
        // local_data = local_data.filter((data) => {
        //     return data.id !== row[0];
        // });

        // this.setState({
        //     RelationsByConcept: local_data
        // });
    }

    render() {
        const { inputName, EntityByName } = this.state;
        return (
            <div>
                <div>
                    <Form onSubmit={this.getEntityByName}>
                        <Form.Group>
                            <Form.Input placeholder='请输入名字' name='inputName' value={this.state.inputName} onChange={this.getInputName} />
                            <Form.Button content='搜索' />
                        </Form.Group>
                    </Form>
                </div>

                {/* <div className='col-md-offset-1 col-md-8'>
                    <div className='panel panel-default'>
                        <div className='panel-heading'>根据名字获取实体</div>
                        <div className='panel-body'>
                            <DeleteRow onDeleteRow={this.onDeleteRow} {...this.state} />
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default EntityQueryByName;