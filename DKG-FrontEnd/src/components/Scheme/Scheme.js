import React, { Component } from 'react'
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

class Scheme extends Component {
        constructor(props) {
        super(props);
        this.state = {
            // exam_conditions : [],
         }
        this.getAllRelations = this.getAllRelations.bind(this);
        this.getRelationsByConcept = this.getRelationsByConcept.bind(this);
        }

        // componentWillMount() {
            
        // }

       getAllRelations() {
          
       }

       getRelationsByConcept() {

    }


    render() {
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

         
             
         


           

            <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>概念</th>
                    <th>关系</th>
                    <th>概念</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                  </tr>
                  <tr>
                    <td>Estavan Lykos</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                  </tr>
                  <tr>
                    <td>Chetan Mohamed</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                  </tr>
                  <tr>
                    <td>Derick Maximinus</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                  </tr>
                  <tr>
                    <td>Friderik Dávid</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous href="#"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next href="#"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
            </div>
        )
    }
}

export default Scheme;
