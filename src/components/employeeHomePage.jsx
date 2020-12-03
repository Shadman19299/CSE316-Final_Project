import React, { Component } from 'react';
import axios from "axios";
//import employeeID from './employeeLoginPage';
import Table from 'react-bootstrap/Table';

//import {useTable} from 'react-table';

class EmployeeHomePage extends Component {
    
    state = { 
        //employeeID :this.props.match.params.employeeID,
        date:[], 
        result:[]
          }
    
    componentDidMount= () =>{
        axios.get('/employeeHome/'+this.props.match.params.employeeID)
            .then(res => {
                console.log(res.data)
                console.log(this.props.match.params.employeeID)
                this.setState({date: res.data})
                //this.setState({date:res.data})
            })
        
    }
      
    render() { 
        //this.getData();
        //const 
        return(
            
            <div>
            <h1>Employee Home Page</h1>
              <h2> {this.state.date} </h2>

            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Collection Date</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
        <td>{this.state.date}</td>
                        <td>pos</td>
                    </tr>
                </tbody>
            </Table>
            </div>);
    }
}
 
export default EmployeeHomePage;