import React, { Component } from 'react';
import {Form, InputGroup, FormControl, Button, Row, Col, Table} from 'react-bootstrap'
import axios from 'axios'

class PoolMappingPage extends Component{
    state = { 
        poolBarcode: '',
        pools: [],
        testBarcodes: [],
        checkedList: [],
        inputs: [],
        inputCounter: 0
    }


    componentDidMount = ()=>{
        axios.get('/poolMap')
        .then(response => {
            this.setState({pools : response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onTestBarcodeChange = (id, event) =>{
        let newObj = {
            "id": id,
            "barcode": event.target.value
        }

        let newList = this.state.testBarcodes.filter((obj)=> obj.id !== id );

        newList.push(newObj);
        this.setState({testBarcodes: newList});
    }

    onAddRow = () =>{
        let newInput = `input-${this.state.inputCounter}`;
        let newObj = {
            "id": newInput,
            "barcode": ''
        }
        let newCounter = this.state.inputCounter + 1
        this.setState({ inputs: this.state.inputs.concat(newInput),
                        testBarcodes: this.state.testBarcodes.concat(newObj),
                        inputCounter: newCounter });
    }

    onDeleteInputs = (input) =>{
        let newInputs = this.state.inputs.filter(someInput => input !== someInput);
        let newBarcodeList = this.state.testBarcodes.filter((obj)=> obj.id !== input);
        this.setState({inputs : newInputs, testBarcodes: newBarcodeList});
    }

    onSubmitHandler = ()=>{
        let newTestBarcodes = []
        this.state.testBarcodes.map(obj => newTestBarcodes.push(obj.barcode));

        axios.post('/poolMap' , { poolBarcode: this.state.poolBarcode, testBarcode: newTestBarcodes})
        .then(() => {
            axios.get('/poolMap')
            .then(response => {
                this.setState({poolBarcode: '', testBarcodes: [], inputs:[], inputCounter: 0, pools: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onCheckBoxChange = (event, poolBarcode)=> {
        if(event.target.checked){
            let newCheckList = this.state.checkedList.concat(poolBarcode);
            this.setState({checkedList : newCheckList});
        }
        else{
            let newCheckList = this.state.checkedList.filter(poolcode => poolcode !== poolBarcode);
            this.setState({checkedList : newCheckList});
        }
    }

    onDeleteHandler = ()=>{
        axios.delete('/poolMap' , {data: this.state.checkedList})
        .then(() => {
            axios.get('/poolMap')
            .then(response => {
                this.setState({pools : response.data, checkedList : []});
            })
            .catch(function (error) {
                console.log(error);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onEditHandler = () =>{
        //update all the states to include only information regarding the selected pool
        if(this.state.checkedList.length === 1){
            let temp = [this.state.checkedList[0]]
            
            let newPoolList = this.state.pools.filter((pool) => pool.poolBarcode !== this.state.checkedList[0]);
            axios.post('/poolMap/getOne', {"poolBarcode" : this.state.checkedList[0]})
                .then(response => {
                    axios.delete('/poolMap', {data : temp})
                        .then(()=>{
                            let newInputList= [];
                            let newTestBarcodes= [];
                            let i = 0;
                            response.data.testBarcode.map(barcode =>{    
                                let newInput = `input-${i}`;
                                let newObj = {
                                    "id": newInput,
                                    "barcode": barcode
                                }
                                newInputList.push(newInput);
                                newTestBarcodes.push(newObj);
                                i = i+1;
                                return barcode;
                            });

                            this.setState({ poolBarcode : response.data.poolBarcode,
                                pools: newPoolList,
                                testBarcodes: newTestBarcodes,
                                checkedList: [],
                                inputs: newInputList,
                                inputCounter: response.data.testBarcode.length});
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else{
            alert('Select only one item to edit!')
        }
    }

    onPoolBarcodeChange = (event)=>{
        this.setState({poolBarcode : event.target.value});
    }

    render() { 
        return ( 
            <div className="container" style={{ marginTop: "20px"}}>
                <h4 style={{textAlign: "center", marginBottom: "20px"}}>Pool Mapping</h4>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={{span: 2 , offset: 1 }}>
                        <b>Pool Barcode:</b>
                        </Form.Label>
                        <Col sm={6}>
                        <Form.Control type="text" defaultValue={this.state.poolBarcode} onChange={(event) => this.onPoolBarcodeChange(event)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={{span: 2, offset: 1 }}>
                        <b>Test Barcode:</b>
                        </Form.Label>
                        <Col sm={6}>
                        {this.state.inputs.map(input => 
                            <InputGroup key={input} className="mb-3">
                                <FormControl
                                type="text"
                                defaultValue= {this.state.testBarcodes.filter(barcodeOBJ=> barcodeOBJ.id === input)[0].barcode}
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(event) => {this.onTestBarcodeChange(input, event)} }
                                />
                                <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={() => this.onDeleteInputs(input)}>Delete</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        )}
                        <Button variant="secondary" onClick={this.onAddRow}>Add Row</Button>
                        </Col>
                    </Form.Group>
                        

                    <Form.Group as={Row}>
                        <Col sm={{ span: 6, offset: 3 }}>
                        <Button variant="secondary" onClick={this.onSubmitHandler}>Submit Pool</Button>
                        </Col>
                    </Form.Group>
                </Form>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Pool Barcode</th>
                        <th>Test Barcodes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pools.map((pool)=>{return <tr key={pool.poolBarcode}>
                                                                <td><Form.Check type="checkbox" inline 
                                                                    onChange={(event)=> this.onCheckBoxChange(event, pool.poolBarcode)}/>{pool.poolBarcode}
                                                                </td>
                                                                <td>{pool.testBarcode.toString()}</td>
                                                              </tr>
                        })}
                    </tbody>
                </Table>
                <Form.Group as={Row}>
                    <Col sm={2}>
                        <Button style={{width: '100%'}} type="submit" variant="secondary" onClick={this.onEditHandler}>Edit Pool</Button>
                    </Col>
                    <Col sm={2}>
                        <Button style={{width: '100%'}} type="submit" variant="secondary" onClick={this.onDeleteHandler}>Delete Pool</Button>
                    </Col>
                </Form.Group>
            </div>
         );
    }

}

export default PoolMappingPage;