import React, { Component } from 'react';
import {
    Badge,
    Button,
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
    Input
} from 'reactstrap';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
// import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import DeleteRow from '../DeleteRow';
//import BootstrapTable from 'react-bootstrap-table-next';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
// import RemoteStoreDeleteRow from './remote-store-delete-row';

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

// const selectRow = {
//   mode: 'radio',
//   clickToSelect: true
// };

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
             AllRelations : data,
 
         }
        this.getAllRelations = this.getAllRelations.bind(this);
        this.getRelationsByConcept = this.getRelationsByConcept.bind(this);
        }

        // componentWillMount() {
            
        // }

       getAllRelations() {
        let url = `http://localhost:8080/relation`;
         fetch(url)
         .then(function(response) {
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

       getRelationsByConcept() {
        let url = `http://localhost:8080/relation`;
        fetch(url)
        .then(function(response) {
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
            {/* <div>
                这里是模式管理
            </div> */}
            <Card>
              <CardHeader>
                <strong>Options</strong>
              </CardHeader>
              <CardBody>
                  <Form inline>
                  <FormGroup className="pr-5">
                      <Button color="primary" onClick={this.getAllRelations}>获取所有关系</Button>{' '}
                  </FormGroup>              
                  
            
                  <FormGroup className="pr-5">
                      <Input type="scheme" name="scheme" id="searchScheme" placeholder="概念名" />
                      <Button color="primary" onClick={this.getRelationsByConcept}>获取关系</Button>
                  </FormGroup>
                  
                  <FormGroup className="pr-5">
                    {/* <Col md="3">
                      <Label htmlFor="file-input">添加关系</Label>
                    </Col> */}
                    {/* <Col xs="3" md="3"> */}
                      <Input type="file" id="file-input" name="file-input"/>
                    {/* </Col> */}
                  </FormGroup>
                </Form>

              </CardBody>
            </Card>


             
             {/* <BootstrapTable
            keyField='id'
            data={ AllRelations }
            remote={ true }
            deleteRow={ true }
            columns={ columns }
            selectRow={ { mode: 'radio' } }
            options={ { onDeleteRow: this.onDeleteRow } }
            /> */}
         
      <div>
        <div className='col-md-offset-1 col-md-8'>
          <div className='panel panel-default'>
            <div className='panel-heading'>Remote Delete Row Example</div>
            <div className='panel-body'>
            {/* <RemoteStoreDeleteRow /> */}
            <DeleteRow onDeleteRow={ this.onDeleteRow.bind(this) } { ...this.state } />
            </div>
          </div>
        </div>
        </div>
            {/* <DeleteRow onDeleteRow={ this.onDeleteRow.bind(this) } { ...this.state } /> */}

            
            </div>
        )
    }
}

export default Scheme;
