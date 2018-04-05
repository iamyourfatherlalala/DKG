import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Entity extends Component {
    render() {
        return (
            <div>
            {/* <div>
                这里是实体管理
            </div> */}
            <Form inline>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="searchEntity" className="mr-sm-2">实体</Label>
                 <Input type="entity" name="entity" id="searchEntity" placeholder="" />
              </FormGroup>
              <Button>搜索</Button>
            </Form>
            </div>
        )
    }
}
export default Entity