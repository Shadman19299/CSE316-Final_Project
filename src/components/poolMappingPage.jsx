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
            this.setState({checkedList : []});
        })
        .catch(function (error) {
            console.log(error);
        })

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

        let newList = this.state.testBarcodes;

        for(let i = 0; i < newList.length; i++){
            if(newList[i].id === id){
                newList = newList.filter((obj)=> obj.id !== id );
            }
        }

        newList.push(newObj);
        this.setState({testBarcodes: newList});
    }

    appendInput = () =>{
        let newInput = `input-${this.state.inputCounter}`;
        let newCounter = this.state.inputCounter + 1
        this.setState({ inputs: this.state.inputs.concat(newInput),
                        inputCounter: newCounter });
    }

    onDeleteInputs = (input) =>{
        let newInputs = this.state.inputs.filter(someInput => input !== someInput);
        this.setState({inputs : newInputs});
    }

    onEditHandler = () =>{
        let barcodesList = this.state.testBarcodes;
        for(let i = 0; i < barcodesList.length; i++){
            barcodesList[i].bar
        }
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
                        <Form.Control type="text" defaultValue={this.state.poolBarcode} onChange={this.onPoolBarcodeChange}/>
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
                            placeholder=""
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(event) => {this.onTestBarcodeChange(input, event)} }
                            />
                            <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={() => this.onDeleteInputs(input)}>Delete</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        )}
                        <Button variant="secondary" onClick={this.appendInput}>Add Row</Button>
                        </Col>
                    </Form.Group>
                        

                    <Form.Group as={Row}>
                        <Col sm={{ span: 6, offset: 3 }}>
                        <Button variant="secondary" onClick={this.onAddHandler}>Submit Pool</Button>
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