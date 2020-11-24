import React, { Component } from 'react';
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import axios from 'axios'

class WellTestingPage extends Component {
    state = { 
        wellBarcode: '',
        poolBarcode: '',
        result: 'In Progess',
        wells: [],
        checkedList: [],
    }

    componentDidMount = ()=>{
        axios.get('/wellTesting')
        .then(response => {
            this.setState({wells : response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onCheckBoxChange = (event, wellBarcode)=> {
        if(event.target.checked){
            let newCheckList = this.state.checkedList.concat(wellBarcode);
            this.setState({checkedList : newCheckList});
        }
        else{
            let newCheckList = this.state.checkedList.filter(wellcode => wellcode !== wellBarcode);
            this.setState({checkedList : newCheckList});
        }
    }

    onDeleteHandler = ()=>{
        axios.delete('/wellTesting' , {data: this.state.checkedList})
        .then(() => {
            this.setState({checkedList : []});
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('/wellTesting')
        .then(response => {
            this.setState({wells : response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onEditHandler = ()=>{
        if(this.state.checkedList.length === 1){
            let temp = [this.state.checkedList[0]]
            
            let newWellsList = this.state.wells.filter((well) => well.wellBarcode !== this.state.checkedList[0]);
            axios.post('/wellTesting/getOne', {"wellBarcode" : this.state.checkedList[0]})
                .then(response => {
                    axios.delete('/wellTesting', {data : temp})
                        .then()
                        .catch(function (error) {
                            console.log(error);
                        })
                    
                    this.setState({ wellBarcode : response.data.wellBarcode,
                                    poolBarcode : response.data.poolBarcode,
                                    result : response.data.result,
                                    wells: newWellsList,
                                    checkedList : []});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        else{
            alert('Select only one item to edit!')
        }
    }

    onAddHandler = (event)=>{
        axios.post('/wellTesting' , { poolBarcode: this.state.poolBarcode, 
                                      wellBarcode: this.state.wellBarcode,
                                      result: this.state.result})
        .then(() => {
            axios.get('/wellTesting')
                .then(response => {
                    this.setState({ wellBarcode : '',
                                    poolBarcode : '',
                                    result : 'In Progress',
                                    wells : response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onWellBarcodeChange = (event)=>{
        this.setState({wellBarcode : event.target.value});
    }
    
    onPoolBarcodeChange = (event)=>{
        this.setState({poolBarcode : event.target.value});
    }

    onSelectChange = (event)=>{
        this.setState({result : event.target.value});
    }

    render() { 
        return ( 
            <div className="container" style={{ marginTop: "20px"}}>
                <h4 style={{textAlign: "center", marginBottom: "20px"}}>Login Page</h4>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={{span: 2 , offset: 1 }}>
                        <b>Well Barcode:</b>
                        </Form.Label>
                        <Col sm={6}>
                        <Form.Control type="text" defaultValue={this.state.wellBarcode} onChange={this.onWellBarcodeChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={{span: 2, offset: 1 }}>
                        <b>Pool Barcode:</b>
                        </Form.Label>
                        <Col sm={6}>
                        <Form.Control type="text" defaultValue={this.state.poolBarcode} onChange={this.onPoolBarcodeChange}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={{span: 2, offset: 1 }}>
                        <b>Result:</b>
                        </Form.Label>
                        <Col sm={6}>
                        <Form.Control as="select" defaultValue={this.state.result} custom onChange={this.onSelectChange}>
                            <option>In Progress</option>
                            <option>Negative</option>
                            <option>Positive</option>
                        </Form.Control>
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
                        <th>Well Barcode</th>
                        <th>Pool Barcode</th>
                        <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.wells.map((well)=>{return <tr key={well.wellBarcode}>
                                                                <td><Form.Check type="checkbox" inline 
                                                                    onChange={(event)=> this.onCheckBoxChange(event, well.wellBarcode)}/>{well.wellBarcode}
                                                                </td>
                                                                <td>{well.poolBarcode}</td>
                                                                <td>{well.result}</td>
                                                              </tr>
                        })}
                    </tbody>
                </Table>
                <Form.Group as={Row}>
                    <Col sm={2}>
                        <Button style={{width: '100%'}} type="submit" variant="secondary" onClick={this.onEditHandler}>Edit</Button>
                    </Col>
                    <Col sm={2}>
                        <Button style={{width: '100%'}} type="submit" variant="secondary" onClick={this.onDeleteHandler}>Delete</Button>
                    </Col>
                </Form.Group>
            </div>
         );
    }
}
 
export default WellTestingPage;