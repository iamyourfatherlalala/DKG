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
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
// import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import DeleteRow from '../DeleteRow';
import EntityQueryByConcept from '../EntityQueryByConcept';
import EntityQueryByName from '../EntityQueryByName';
//import BootstrapTable from 'react-bootstrap-table-next';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
// import RemoteStoreDeleteRow from './remote-store-delete-row';

import 'semantic-ui-css/semantic.min.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react'

import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemNav: 'entity_all_relations',
        }
        this.handleNavClick = this.handleNavClick.bind(this);
    }

    handleNavClick(e, { name }) {
        this.setState({ activeItemNav: name });
    }

    render() {
        const { activeItemNav } = this.state;

        return (
            <Router>
                <div>
                    <div>
                        <Menu style={{ marginTop: -1.55 + 'rem', marginLeft: -2.11 + 'rem', marginRight: -2.11 + 'rem',}} pointing>
                            <Menu.Item as={Link} to='/entity-query-by-name' name='entity_query_by_name' active={activeItemNav === 'entity_query_by_name'} onClick={this.handleNavClick}>根据名字获取实体</Menu.Item>
                            <Menu.Item as={Link} to='/entity-query-by-concept' name='entity_query_by_concept' active={activeItemNav === 'entity_query_by_concept'} onClick={this.handleNavClick}>根据概念获取实体</Menu.Item>
                        </Menu>
                    </div>

                    <div>
                        <Route path="/entity-query-by-name" exact component={EntityQueryByName} />
                        <Route path="/entity-query-by-concept" exact component={EntityQueryByConcept} />
                    </div>
                </div>
            </Router>
        )

        // return (
        //     <div>

        //         <Card>
        //             <CardHeader>
        //                 <strong>Options</strong>
        //             </CardHeader>
        //             <CardBody>
        //                 <Form inline>
        //                     <FormGroup className="pr-5">
        //                         <Input type="name" name="name" id="queryByName" placeholder="名字" />
        //                         <Button color="primary" onClick={this.getRelationsByConcept}>获取关系</Button>
        //                     </FormGroup>

        //                     <FormGroup className="pr-5">
        //                         <Input type="concept" name="concept" id="queryByConcept" placeholder="概念" />
        //                         <Button color="primary" onClick={this.getRelationsByConcept}>获取关系</Button>
        //                     </FormGroup>
        //                 </Form>

        //             </CardBody>
        //         </Card>

        //         <ReactTable
        //             data={data}
        //             columns={[
        //                 {
        //                     Header: "Id",
        //                     accessor: "id"
        //                 },
        //                 {
        //                     Header: "概念",
        //                     accessor: "fromConcept"
        //                 },
        //                 {
        //                     Header: "关系",
        //                     accessor: "relation"
        //                 },
        //                 {
        //                     Header: "概念",
        //                     accessor: "toConcept"
        //                 },
        //             ]}
        //             defaultPageSize={10}
        //             className="-striped -highlight"
        //         />
        //     </div>
        // )
    }
}
export default Entity;