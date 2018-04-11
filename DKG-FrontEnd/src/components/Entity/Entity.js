import React, {Component} from 'react'
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
// import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
// import DeleteRow from '../DeleteRow';
import ReactTable from "react-table";
import "react-table/react-table.css";

// let data1 = [
//     {
//     	// 该实体本身的属性和值
//         "dkgEntityPropertyList": [
//             {
//                 "propertyName": "name",
//                 "propertyValue": "Keanu Reeves"
//             },
//             {
//                 "propertyName": "born",
//                 "propertyValue": "1964"
//             }
//         ],
//         // 该实体的关系列表
//         "dkgEntityRelationList": [
//             {
//             	//关系名
//                 "relation": "ACTED_IN",
//                 //关系关联的另一个实体的所有属性和值
//                 "toDKGEntityPropertyList": [
//                     {
//                         "propertyName": "tagline",
//                         "propertyValue": "Welcome to the Real World"
//                     },
//                     {
//                         "propertyName": "title",
//                         "propertyValue": "The Matrix"
//                     },
//                     {
//                         "propertyName": "released",
//                         "propertyValue": "1999"
//                     }
//                 ]
//             },
//             {
//                 "relation": "ACTED_IN",
//                 "toDKGEntityPropertyList": [
//                     {
//                         "propertyName": "tagline",
//                         "propertyValue": "Free your mind"
//                     },
//                     {
//                         "propertyName": "title",
//                         "propertyValue": "The Matrix Reloaded"
//                     },
//                     {
//                         "propertyName": "released",
//                         "propertyValue": "2003"
//                     }
//                 ]
//             }
//         ]
//     }
// ]

const data = [
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

//   const columns = [
//     {
//       dataField: 'id',
//       text: 'ID'
//     }, {
//     dataField: 'fromConcept',
//     text: '概念'
//   }, {
//     dataField: 'relation',
//     text: '关系'
//   }, {
//     dataField: 'toConcept',
//     text: '概念'
//   }];


class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = {
             RelationsByName : data,
            // RelationsByConcept : data2,
 
         }
        // this.getAllRelations = this.getAllRelations.bind(this);
        // this.getRelationsByConcept = this.getRelationsByConcept.bind(this);
        }

       
    render() {
       // const { RelationsByName } = this.state;
        return (
            <div>
            {/* <div>
                这里是实体管理
            </div> */}

            <Card>
              <CardHeader>
                <strong>Options</strong>
              </CardHeader>
              <CardBody>
                  <Form inline>            
                  <FormGroup className="pr-5">
                      <Input type="name" name="name" id="queryByName" placeholder="名字" />
                      <Button color="primary" onClick={this.getRelationsByConcept}>获取关系</Button>
                  </FormGroup>
                  
                  <FormGroup className="pr-5">
                      <Input type="concept" name="concept" id="queryByConcept" placeholder="概念" />
                      <Button color="primary" onClick={this.getRelationsByConcept}>获取关系</Button>
                  </FormGroup>
                </Form>

              </CardBody>
            </Card>


                
               <ReactTable
                data={data}
                columns={[
                        {
                            Header: "Id",
                            accessor: "id"
                     },
                     {
                        Header: "概念",
                        accessor: "fromConcept"
                 },
                 {
                    Header: "关系",
                    accessor: "relation"
             },
             {
                Header: "概念",
                accessor: "toConcept"
         },
                                    ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />

             {/* <DeleteRow onDeleteRow={ this.onDeleteRow.bind(this) } { ...this.state } /> */}
            </div>
        )
    }
}
export default Entity