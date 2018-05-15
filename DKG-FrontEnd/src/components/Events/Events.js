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
import { Icon, Input, Menu, Segment, Search, Form, Button, Select } from 'semantic-ui-react';
import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

import cytoscape from 'cytoscape';
import cydagre from 'cytoscape-dagre';
import jquery from 'jquery';
import qtip from 'cytoscape-qtip';
import qtip2 from 'qtip2';
// window.$ = window.jQuery = require('jquery');
cytoscape.use(qtip);
//cyqtip(cytoscape, jquery);

const options = [
    { key: 'event', text: '事件', value: 'event' },
    { key: 'company', text: '公司', value: 'company' },
  ]


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            EntityByName: [],
            id: 0,
            nodes: [],
            edges: [],
            style: [
                {
                    selector: 'node[label = "公司"]',
                    css: {
                        'background-color': '#6FB1FC',
                        'width': 'mapData(baz, 0, 10, 10, 40)',
                        'height': 'mapData(baz, 0, 10, 10, 40)',
                        'content': 'data(name)'
                    }
                },
                {
                    selector: 'node[label = "property"]',
                    css: {
                        'background-color': '#F5A45D',
                        'width': 'mapData(baz, 0, 10, 10, 40)',
                        'height': 'mapData(baz, 0, 10, 10, 40)',
                        'content': 'data(propertyValue)'
                    }
                },
                {
                    selector: 'edge',
                    css: {
                        'content': 'data(relationship)',
                        'curve-style': 'bezier',
                        'width': 1,
                        'line-color': 'black',
                        'target-arrow-color': '#ddd',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],
            layout: {
                name: 'circle',
                padding: 10
                /*
                name: 'concentric',
                concentric: function (node) {
                    return node.degree()
                },
                levelWidth: function (nodes) {
                    return 2
                } */
            }
        };
        this.getInputName = this.getInputName.bind(this);
        this.getEntityByName = this.getEntityByName.bind(this);
        this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this);
    }

    componentDidMount() {
        this.renderCytoscapeElement();
    }

    getInputName(e, { name, value }) {
        this.setState({ [name]: value });
    }

    getEntityByName() {
        const { inputName } = this.state;
        let proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        let url = `http://localhost:8080/entity/queryByName/${inputName}`;
        console.log(inputName);
        fetch((url), {
            method: 'GET',
            //    credentials: 'same-origin'
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    this.setState({
                        EntityByName: data, nodes: [],
                        edges: [], id: 0
                    });
                    data.forEach(node => {
                        let destNodeId = node['id'];
                        const labels = node['labels'];
                        const destNode = { data: { id: destNodeId, label: labels && labels.length > 0 ? labels[0] : 'Unknown' } };
                        const dkgEntityPropertyList = node['dkgEntityPropertyList'];
                        dkgEntityPropertyList.forEach(p => {
                            const propertyName = p['propertyName'];
                            const propertyValue = p['propertyValue'];
                            console.log(propertyValue);
                            if (propertyName === 'name') {
                                destNode['data']['name'] = propertyValue
                            }
                        });
                        const relationList = node['dkgEntityRelationList'];
                        relationList.forEach(r => {
                            const nodeId = `property-${this.state.id++}`;
                            let name = 'Unknown';
                            const relation = r['relation'];
                            const toDKGEntityPropertyList = r['toDKGEntityPropertyList'];
                            for (let i = 0; i < toDKGEntityPropertyList.length; i++) {
                                if (toDKGEntityPropertyList[i]['propertyName'] === 'name') {
                                    name = toDKGEntityPropertyList[i]['propertyValue']
                                }
                            }
                            this.state.nodes.push({
                                data: {
                                    id: nodeId,
                                    propertyValue: name,
                                    label: 'property'
                                }
                            });
                            this.state.edges.push({
                                data: {
                                    source: destNodeId,
                                    target: nodeId,
                                    relationship: relation
                                }
                            })
                        });
                        this.state.nodes.push(destNode);
                        cytoscape({
                            container: document.getElementById('cy'),
                            style: this.state.style,
                            elements: {
                                nodes: this.state.nodes,
                                edges: this.state.edges
                            },
                            layout: this.state.layout
                        })
                    })
                });
            }).catch((error) => {
                console.log(error);
            });
        this.setState({ inputName: '' });
        console.log('12345678900987654321');
    }

    renderCytoscapeElement() {
        // cytoscape.use(qtip);
        console.log('* Cytoscape.js is rendering the graph..');



        this.cy = cytoscape({
            container: document.getElementById('cy'),

            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'background-color': '#B3767E',
                    'width': 'mapData(baz, 0, 10, 10, 40)',
                    'height': 'mapData(baz, 0, 10, 10, 40)',
                    'content': 'data(id)'
                })
                .selector('edge')
                .css({
                    'line-color': '#F2B1BA',
                    'target-arrow-color': '#F2B1BA',
                    'width': 2,
                    'target-arrow-shape': 'circle',
                    'opacity': 0.8,
                    'label': 'data(label)'
                })
                .selector(':selected')
                .css({
                    'background-color': 'black',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black',
                    'opacity': 1
                })
                .selector('.faded')
                .css({
                    'opacity': 0.25,
                    'text-opacity': 0
                })
                .selector('.autorotate')
                .css({
                    'edge-text-rotation': 'autorotate'
                }),


            elements: {
                nodes: [
                    { data: { id: '金融危机' } },
                    { data: { id: '雷曼兄弟控股公司' } },
                    { data: { id: '华盛顿互助银行' } },
                    { data: { id: '世界通信公司' } },
                    { data: { id: '通用汽车' } }
                ],

                edges: [
                    { data: { id: 'ab', source: '金融危机', target: '雷曼兄弟控股公司', label: '破产' }, classes: 'autorotate' },
                    { data: { id: 'ac', source: '金融危机', target: '华盛顿互助银行', label: '破产' }, classes: 'autorotate' },
                    { data: { id: 'ad', source: '金融危机', target: '世界通信公司', label: '破产' }, classes: 'autorotate' },
                    { data: { id: 'ae', source: '金融危机', target: '通用汽车', label: '破产' }, classes: 'autorotate' }
                ]

            },

            layout: {
                name: 'circle',
                padding: 10
            },

        });

    }


    render() {
        const { inputName, EntityByName } = this.state;
        let cyStyle = {
            height: '800px',
            width: '1000px',
            margin: '20px 0px'
        };

        return (
            <div>
                {/* <div>
                    <Form onSubmit={this.getEntityByName}>
                        <Form.Group>
                            <Form.Input placeholder='请输入名字' name='inputName' value={this.state.inputName} onChange={this.getInputName} />
                            <Form.Button content='搜索' />
                        </Form.Group>
                    </Form>
                </div> */}
                <div>
                    <Input type='text' placeholder='Search...' action>
                        <input />
                        <Select compact options={options} defaultValue='event' />
                        <Button type='submit'>搜索</Button>
                    </Input>
                </div>

                <div className="node_selected">
                    <div style={cyStyle} id="cy" />
                </div>
            </div>
        )
    }

}

export default Events;