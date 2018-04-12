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
import DeleteRow from '../DeleteRow';
import Scheme from '../Scheme';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react'
import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

class SchemeQueryByConcept extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputConcept: ''
        }
        this.getRelationsByConcept = this.getRelationsByConcept.bind(this);
        this.getInputConcept = this.getInputConcept.bind(this);
    }

    getInputConcept(e) {
        this.setState({ inputConcept: e.target.value });
      }

    getRelationsByConcept() {
        // let url = `http://localhost:8080/relation`;
        // fetch(url)
        //   .then(function (response) {
        //     if (!response.ok) {
        //       throw Error(response.statusText);
        //     }
        //     return response;
        //   }).then((response) => {
        //     response.json().then((data) => {
        //       this.setState({ AllRelations: data });
        //       // alert(this.state.exam_conditions[0].id);
        //     });
        //   }).catch((error) => {
        //     console.log(error);
        //   });
        console.log('12345678900987654321');
      }

    render() {
        return (
            <div>
                <Input
                    icon={<Icon name='search' inverted circular link={true} onClick={this.getRelationsByConcept} />}
                    placeholder='Search...'
                />
            </div>
        )
    }
}

export default SchemeQueryByConcept;