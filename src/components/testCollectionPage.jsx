import React, { Component } from 'react';
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import axios from 'axios'


class TestCollectionPage extends Component{
    state = { 
        employeeID: '',
        testBarcode: '',
        tests: [],
        checkedList: [],
    }

    componentDidMount = ()=>{
        axios.get('/testCollection')
        .then(response => {
            this.setState({tests : response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }


    onEmployeeIDChange = (event)=>{
        this.setState({employeeID : event.target.value});
    }

    onTestBarcodeChange = (event)=>{
        this.setState({testBarcode : event.target.value});
    }

    onCheckBoxChange = (event, employeeID, testBarcode)=> {
        let selectedObj = {"employee": employeeID,
                           "testBarcode": testBarcode};
        if(event.target.checked){
            let newCheckList = this.state.checkedList.concat(selectedObj);
            this.setState({checkedList : newCheckList});
        }
        else{
            let newCheckList = this.state.checkedList.filter(someObj => someObj.testBarcode !== testBarcode);
            this.setState({checkedList : newCheckList});
        }

    }

    onAddHandler = (event)=>{
        axios.post('/testCollection' , {"employeeID": this.state.employeeID, 
                                        "testBarcode": this.state.testBarcode
                                       })
        .then(() => {
            axios.get('/testCollection')
                .then(response => {
                    this.setState({ employeeID: '',
                                    testBarcode: '',
                                    tests: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onDeleteHandler = ()=>{
        for(let key in this.state.checkedList){
            axios.delete('/testCollection', {data: this.state.checkedList[key]})
            .then(() => {
                console.log("Test deleted");
            })
            .catch(function (error) {
                console.log(error);
            });
        }

        this.setState({checkedList : []});
        
        axios.get('/testCollection')
        .then(response => {
            this.setState({tests : response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }


    render() { 
        return ( 
            <div className="container" style={{ marginTop: "20px"}}>
                <h4 style={{textAlign: "center", marginBottom: "20px"}}>Test Collection</h4>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={{span: 2 , offset: 1 }}>
                        <b>Employee ID:</b>
                        </Form.Label>
                        <Col sm={6}>
                        <Form.Control type="text" defaultValue={this.state.employeeID} onChange={this.onEmployeeIDChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={{span: 2, offset: 1 }}>
                        <b>Test Barcode:</b>
                        </Form.Label>
                        <Col sm={6}>
                        <Form.Control type="text" defaultValue={this.state.testBarcode} onChange={this.onTestBarcodeChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 6, offset: 3 }}>
                        <Button variant="secondary" onClick={this.onAddHandler}>Add</Button>
                        </Col>
                    </Form.Group>
                </Form>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Employee ID</th>
                        <th>Test Barcode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tests.map((test)=>{return <tr key={test.testBarcode}>
                                                                <td><Form.Check type="checkbox" inline 
                                                                    onChange={(event)=> this.onCheckBoxChange(event, test.employeeID, test.testBarcode)}/>{test.employeeID}
                                                                </td>
                                                                <td>{test.testBarcode}</td>
                                                              </tr>
                        })}
                    </tbody>
                </Table>
                <Form.Group as={Row}>
                    <Col sm={2}>
                        <Button style={{width: '100%'}} type="submit" variant="secondary" onClick={this.onDeleteHandler}>Delete</Button>
                    </Col>
                </Form.Group>
            </div>
         );
    }



}




export default TestCollectionPage;