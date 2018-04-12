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
// import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import Scheme from '../Scheme';
import DeleteRow from '../DeleteRow';
//import BootstrapTable from 'react-bootstrap-table-next';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
// import RemoteStoreDeleteRow from './remote-store-delete-row';

import 'semantic-ui-css/semantic.min.css';
import { Input, Menu, Segment } from 'semantic-ui-react'

import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link} from 'react-router-dom';

let data = [
    {
      "id": "0",
      "fromConcept": "公司",
      "relation": "CEO",
      "toConcept": "人"
    },
    {
      "id": "1",
      "fromConcept": "公司",
      "relation": "控股子公司",
      "toConcept": "公司"
    },
    {
      "id": "2",
      "fromConcept": "人",
      "relation": "创建",
      "toConcept": "公司"
    }
  ]

class SchemeAllRelations extends Component {
    constructor(props) {
        super(props);
        this.state = {
          AllRelations: data,    
        }
        this.getAllRelations = this.getAllRelations.bind(this);
      }

      getAllRelations() {
        let url = `http://localhost:8080/relation`;
        fetch(url)
          .then(function (response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          }).then((response) => {
            response.json().then((data) => {
              this.setState({ AllRelations: data });
              // alert(this.state.exam_conditions[0].id);
            });
          }).catch((error) => {
            console.log(error);
          });
      }

      onDeleteRow(row) {
        data = data.filter((product) => {
          return product.id !== row[0];
        });
    
        this.setState({
          AllRelations: data
        });
      }

      render() {
        const { AllRelations } = this.state;
        return (
            <div>
                <div className='col-md-offset-1 col-md-8'>
            <div className='panel panel-default'>
              {/* <div className='panel-heading'>Remote Delete Row Example</div> */}
              <div className='panel-body'>
                {/* <RemoteStoreDeleteRow /> */}
                <DeleteRow onDeleteRow={this.onDeleteRow.bind(this)} {...this.state} />
              </div>
            </div>
          </div>
            </div>
        )
    }
}

export default SchemeAllRelations;