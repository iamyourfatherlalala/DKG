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
import SchemeAllRelations from '../SchemeAllRelations';
import SchemeQueryByConcept from '../SchemeQueryByConcept';
import SchemeAddRelations from '../SchemeAddRelations';
//import BootstrapTable from 'react-bootstrap-table-next';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
// import RemoteStoreDeleteRow from './remote-store-delete-row';

import 'semantic-ui-css/semantic.min.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react'

import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

const columns = [
  {
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'fromConcept',
    text: '概念'
  }, {
    dataField: 'relation',
    text: '关系'
  }, {
    dataField: 'toConcept',
    text: '概念'
  }];

class Scheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemNav: 'scheme_all_relations',
    }

    this.handleNavClick = this.handleNavClick.bind(this);
  }

  // componentWillMount() {

  // }


  handleNavClick(e, { name }) {
    this.setState({ activeItemNav: name });
  }

  render() {

    const { activeItemNav } = this.state;

    return (
      <Router>
        <div>
          <div>
            <Menu pointing>
              <Menu.Item as={Link} to='/all-relations' name='scheme_all_relations' active={activeItemNav === 'scheme_all_relations'} onClick={this.handleNavClick}>获取所有关系</Menu.Item>
              <Menu.Item as={Link} to='/query-by-concept' name='scheme_query_by_concept' active={activeItemNav === 'scheme_all_relations'} onClick={this.handleNavClick}>根据概念获取关系</Menu.Item>
              <Menu.Item as={Link} to='/add-relations' name='scheme_add_relations' active={activeItemNav === 'scheme_all_relations'} onClick={this.handleNavClick}>添加关系</Menu.Item>


              {/* <Menu.Menu position='right'>
                <Menu.Item>
                  <Input
                    icon={<Icon name='search' inverted circular link={true} onClick={this.getRelationsByConcept}/>}
                    placeholder='Search...'
                  />
                </Menu.Item>
              </Menu.Menu> */}
            </Menu>
          </div>

          <div>
            <Route path="/all-relations" exact component={SchemeAllRelations} />
            <Route path="/query-by-concept" exact component={SchemeQueryByConcept} />
            <Route path="/add-relations" exact component={SchemeAddRelations} />
          </div>

          {/* <BootstrapTable
            keyField='id'
            data={ AllRelations }
            remote={ true }
            deleteRow={ true }
            columns={ columns }
            selectRow={ { mode: 'radio' } }
            options={ { onDeleteRow: this.onDeleteRow } }
            /> */}

        </div>
      </Router>
    )
  }
}

export default Scheme;
