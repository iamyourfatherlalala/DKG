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

import cytoscape from 'cytoscape';
import cydagre from 'cytoscape-dagre';

class EntityQueryByName extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         inputName: '',
    //         EntityByName: []
    //     }
    //     this.getInputName = this.getInputName.bind(this);
    //     this.getEntityByName = this.getEntityByName.bind(this);
    //     this.onDeleteRow = this.onDeleteRow.bind(this);
    // }

    // getInputName(e, { name, value }) {
    //     this.setState({ [name]: value });
    // }

    // getEntityByName() {
    //     const { inputName } = this.state;
    //     let proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
    //     let url = `http://106.14.134.97/DKGBackend/entity/queryByName/${inputName}`;
    //     console.log(inputName);
    //     fetch((proxyurl + url), {
    //         method: 'GET',
    //         // credentials: 'same-origin'    
    //     })
    //         .then(function (response) {
    //             if (!response.ok) {
    //                 throw Error(response.statusText);
    //             }
    //             return response;
    //         }).then((response) => {
    //             response.json().then((data) => {
    //                 // var id = "id";
    //                 // for (let i = 0; i < data.length; i++) {
    //                 //     data[i][id] = i.toString();
    //                 // }
    //                 console.log(data);
    //                 this.setState({ EntityByName: data });
    //                 // alert(this.state.exam_conditions[0].id);
    //             });
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    //         this.setState({ inputName: '' });
    //     console.log('12345678900987654321');
    // }

    // onDeleteRow(row) {
    //     // let local_data = this.state.RelationsByConcept;
    //     // local_data = local_data.filter((data) => {
    //     //     return data.id !== row[0];
    //     // });

    //     // this.setState({
    //     //     RelationsByConcept: local_data
    //     // });
    // }

    // render() {
    //     const { inputName, EntityByName } = this.state;
    //     return (
    //         <div>
    //             <div>
    //                 <Form onSubmit={this.getEntityByName}>
    //                     <Form.Group>
    //                         <Form.Input placeholder='请输入名字' name='inputName' value={this.state.inputName} onChange={this.getInputName} />
    //                         <Form.Button content='搜索' />
    //                     </Form.Group>
    //                 </Form>
    //             </div>

    //             {/* <div className='col-md-offset-1 col-md-8'>
    //                 <div className='panel panel-default'>
    //                     <div className='panel-body'>
    //                         <BootstrapTable data={RelationsByConcept}
    //                             remote={true}
    //                             deleteRow={true}
    //                             selectRow={{ mode: 'radio' }}
    //                             options={{ onDeleteRow: this.onDeleteRow }}>
    //                             <TableHeaderColumn dataField='id' isKey={true}>ID</TableHeaderColumn>
    //                             <TableHeaderColumn dataField='fromConcept'>概念</TableHeaderColumn>
    //                             <TableHeaderColumn dataField='relation'>关系</TableHeaderColumn>
    //                             <TableHeaderColumn dataField='toConcept'>概念</TableHeaderColumn>
    //                         </BootstrapTable>
    //                     </div>
    //                 </div>
    //             </div> */}
    //         </div>
    //     )
    // }
    constructor(props){
        super(props);
        this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    }

    renderCytoscapeElement(){

        console.log('* Cytoscape.js is rendering the graph..');

        this.cy = cytoscape(
        {
            container: document.getElementById('cy'),

            boxSelectionEnabled: false,
            autounselectify: true,

            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'height': 80,
                    'width': 80,
                    'background-fit': 'cover',
                    'border-color': '#000',
                    'border-width': 3,
                    'border-opacity': 0.5,
                    'content': 'data(name)',
                    'text-valign': 'center',
                })
                .selector('edge')
                .css({
                    'width': 6,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#ffaaaa',
                    'target-arrow-color': '#ffaaaa',
                    'curve-style': 'bezier'
                })
                ,
            elements: {
                nodes: [
                    { data: { id: 'cat' } },
                    { data: { id: 'bird' } },
                    { data: { id: 'ladybug' } },
                    { data: { id: 'aphid' } },
                    { data: { id: 'rose' } },
                    { data: { id: 'grasshopper' } },
                    { data: { id: 'plant' } },
                    { data: { id: 'wheat' } }
                ],
                edges: [
                    { data: { source: 'cat', target: 'bird' } },
                    { data: { source: 'bird', target: 'ladybug' } },
                    { data: { source: 'bird', target: 'grasshopper' } },
                    { data: { source: 'grasshopper', target: 'plant' } },
                    { data: { source: 'grasshopper', target: 'wheat' } },
                    { data: { source: 'ladybug', target: 'aphid' } },
                    { data: { source: 'aphid', target: 'rose' } }
                ]
            },

            layout: {
                name: 'breadthfirst',
                directed: true,
                padding: 10
            }
            }); 
    }

    componentDidMount(){
        this.renderCytoscapeElement();
    }

    render(){
        let cyStyle = {
            height: '1000px',
            width: '1000px',
            margin: '20px 0px'
          };

        return(
            <div className="node_selected">
                <div style={cyStyle} id="cy"/>
            </div>
        )
    }
}

export default EntityQueryByName;