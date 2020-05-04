import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Button } from 'reactstrap';

export default class CreateTask extends Component {
    render() {
        return (
            <div className="w-50 mx-auto">
                <h3 className="pb-20 pt-30">Create Task</h3>
                <Form>
                    <FormGroup>
                        <Label for="exampleName">Name</Label>
                        <Input type="text" name="name" placeholder="task name..." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleDescription">Description</Label>
                        <Input type="text" name="desciption" placeholder="description..." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleStatus">Status</Label>
                        <Input type="text" name="status" placeholder="status...." />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleMemberID">Member ID</Label>
                        <Input type="text" name="memberID"  placeholder="member id...." />
                    </FormGroup>
                    <FormGroup check>
                        <Input type="checkbox" name="check" id="exampleCheck" />
                        <Label for="exampleCheck" check>I agree with the rule</Label>
                    </FormGroup>
                    <Button color="primary">Create</Button>
                </Form>
            </div>
        )
    }
}