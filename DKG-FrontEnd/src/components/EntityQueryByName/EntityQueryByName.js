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
import jquery from 'jquery';
import qtip from 'cytoscape-qtip';
import qtip2 from 'qtip2';
// window.$ = window.jQuery = require('jquery');
cytoscape.use(qtip);
//cyqtip(cytoscape, jquery);


class EntityQueryByName extends Component {
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
                // nodes: [
                //     { data: { id: 'a', foo: 3, bar: 5, baz: 7 } },
                //     { data: { id: 'b', foo: 7, bar: 1, baz: 3 } },
                //     { data: { id: 'c', foo: 2, bar: 7, baz: 6 } },
                //     { data: { id: 'd', foo: 9, bar: 5, baz: 2 } },
                //     { data: { id: 'e', foo: 2, bar: 4, baz: 5 } }
                // ],

                nodes: [
                    { data: { id: 'a' } },
                    { data: { id: 'b' } },
                    { data: { id: 'c' } },
                    { data: { id: 'd' } },
                    { data: { id: 'e' } }
                ],

                // edges: [
                //     { data: { id: 'ae', weight: 1, source: 'a', target: 'e', label: 'edge ae' }, classes: 'autorotate' },
                //     { data: { id: 'ab', weight: 3, source: 'a', target: 'b', label: 'edge ab' }, classes: 'autorotate' },
                //     { data: { id: 'be', weight: 4, source: 'b', target: 'e', label: 'edge be' }, classes: 'autorotate' },
                //     { data: { id: 'bc', weight: 5, source: 'b', target: 'c', label: 'edge bc' }, classes: 'autorotate' },
                //     { data: { id: 'ce', weight: 6, source: 'c', target: 'e', label: 'edge ce' }, classes: 'autorotate' },
                //     { data: { id: 'cd', weight: 2, source: 'c', target: 'd', label: 'edge cd' }, classes: 'autorotate' },
                //     { data: { id: 'de', weight: 7, source: 'd', target: 'e', label: 'edge de' }, classes: 'autorotate' }
                // ]

                edges: [
                    { data: { id: 'ae', source: 'a', target: 'e', label: 'edge ae' }, classes: 'autorotate' },
                    { data: { id: 'ab', source: 'a', target: 'b', label: 'edge ab' }, classes: 'autorotate' },
                    { data: { id: 'be', source: 'b', target: 'e', label: 'edge be' }, classes: 'autorotate' },
                    { data: { id: 'bc', source: 'b', target: 'c', label: 'edge bc' }, classes: 'autorotate' },
                    { data: { id: 'ce', source: 'c', target: 'e', label: 'edge ce' }, classes: 'autorotate' },
                    { data: { id: 'cd', source: 'c', target: 'd', label: 'edge cd' }, classes: 'autorotate' },
                    { data: { id: 'de', source: 'd', target: 'e', label: 'edge de' }, classes: 'autorotate' }
                ]

            },

            layout: {
                name: 'circle',
                padding: 10
            },

            //     ready: function () {
            //         window.cy = this;
            //          this.cy.on('tab', 'node', function(event) {
            //     console.log('lalalalalalalalalalalalalalalallalalallalalala')
            //     event.target.qtip({
            //              content: '12345678900987654321 !!!!!!!!!!!!!!!',
            //     position: {
            //       my: 'top center',
            //       at: 'bottom center'
            //     },
            //     style: {
            //       classes: 'qtip-bootstrap',
            //       tip: {
            //         width: 16,
            //         height: 8
            //       }
            //     }
            //     }, event)
            // })
            //     },

        });

        // cy.$('#a').qtip({
        //     content: 'Hello!',
        //     position: {
        //       my: 'top center',
        //       at: 'bottom center'
        //     },
        //     style: {
        //       classes: 'qtip-bootstrap',
        //       tip: {
        //         width: 16,
        //         height: 8
        //       }
        //     }
        //   });

        this.cy.on('tap', 'node', function (event) {
            console.log('lalalalalalalalalalalalalalalallalalallalalala')
            event.target.qtip({
                content: '12345678900987654321 !!!!!!!!!!!!!!!',
                position: {
                    my: 'top center',
                    at: 'bottom center'
                },
                style: {
                    classes: 'qtip-bootstrap',
                    tip: {
                        width: 16,
                        height: 8
                    }
                }
            }, event)
        })

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
                <div>
                    <Form onSubmit={this.getEntityByName}>
                        <Form.Group>
                            <Form.Input placeholder='请输入名字' name='inputName' value={this.state.inputName} onChange={this.getInputName} />
                            <Form.Button content='搜索' />
                        </Form.Group>
                    </Form>
                </div>

                <div className="node_selected">
                    <div style={cyStyle} id="cy" />
                </div>
            </div>
        )
    }

}

export default EntityQueryByName;