import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import 'semantic-ui-css/semantic.min.css';
import { Icon, Input, Menu, Segment, Search, Form } from 'semantic-ui-react'

class SchemeAddRelations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            AddedRelations: []
        }
        this.onChange = this.onChange.bind(this);
        this.upLoadFile = this.upLoadFile.bind(this);
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    upLoadFile(e) {
        e.preventDefault();
        const proxyurl = "https://cors-anywhere.herokuapp.com/";  // could add Headers instead
        const url = "http://106.14.134.97/DKGBackend/relation/import/";
        const { file, AddedRelations } = this.state;
        let formdata = new FormData();
        formdata.append('file', file);

        console.log(file);
        fetch((proxyurl + url), {
            method: 'POST',
            // data: {
            //     file: file
            // },
            // body: JSON.stringify({
            //     data: formdata[0]
            // })
            body: formdata
        })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then((response) => {
                response.json().then((data) => {
                    // var id = "id";
                    // for (let i = 0; i < data.length; i++) {
                    //     data[i][id] = i.toString();
                    // }
                    console.log(data);
                    this.setState({ AddedRelations: data });
                    // alert(this.state.exam_conditions[0].id);
                });
            }).catch((error) => {
                console.log(error);
            });
        console.log('12345678900987654321');
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.upLoadFile}>
                    <Form.Group>
                        <Form.Input type="file" name='file' onChange={this.onChange}/>
                        <Form.Button content='添加关系' />
                    </Form.Group>
                </Form>
                {/* <Form>
                    <Input type="file" name="file" id="file" accept="owl" onChange={this.upLoadFile} />
                </Form> */}

            </div>
        )
    }
}

export default SchemeAddRelations;