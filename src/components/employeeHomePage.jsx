import React, { Component } from 'react';
import employeeID from './employeeLoginPage'
import Table from 'react-bootstrap/Table'
import {useTable} from 'react-table'

class EmployeeHomePage extends Component {
    state = {  }
    render() { 
        const 
        return (<div>
            <h1>Employee Home Page</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Collection Date</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </Table>
            </div>);
    }
}
 
export default EmployeeHomePage;