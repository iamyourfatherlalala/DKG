import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react'

class SchemeAddRelations extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Input type="file" name="file" id="file" accept="owl" />
                </Form>

            </div>
        )
    }
}

export default SchemeAddRelations;