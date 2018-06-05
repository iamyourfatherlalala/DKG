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
import AnnouncementInquiry from '../AnnouncementInquiry';
import NewsInquiry from '../NewsInquiry';
import ResearchReportInquiry from '../ResearchReportInquiry';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table-next';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react'
import { browserHistory, Redirect } from 'react-router'
import { BrowserRouter as Router, Route, IndexRedirect, Link } from 'react-router-dom';

class NamedEntityRecognition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemNav: 'announcement_inquiry',
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
                    
                        <Menu style={{ marginTop: -1.55 + 'rem', marginLeft: -2.11 + 'rem', marginRight: -2.11 + 'rem',}} pointing>
                            <Menu.Item as={Link} to='/announcementInquiry' name='announcement_inquiry' active={activeItemNav === 'announcement_inquiry'} onClick={this.handleNavClick}>公告查询</Menu.Item>
                            <Menu.Item as={Link} to='/newsInquiry' name='news_inquiry' active={activeItemNav === 'news_inquiry'} onClick={this.handleNavClick}>新闻查询</Menu.Item>
                            <Menu.Item as={Link} to='/researchReportInquiry' name='research_report_inquiry' active={activeItemNav === 'research_report_inquiry'} onClick={this.handleNavClick}>研报查询</Menu.Item>
                        </Menu>
                    

                    
                        <Route path="/announcementInquiry" exact component={AnnouncementInquiry} />
                        <Route path="/newsInquiry" exact component={NewsInquiry} />
                        <Route path="/researchReportInquiry" exact component={ResearchReportInquiry} />
                
                </div>
            </Router>
        )


    }
}
export default NamedEntityRecognition;