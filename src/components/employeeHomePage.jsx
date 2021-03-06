import React, { Component } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';


class EmployeeHomePage extends Component {
    
    state = { 
        data:[]
          }
    
    componentDidMount= () =>{
        axios.get('/employeeHome/'+this.props.match.params.employeeID)
            .then(res => {
                this.setState({data: res.data})
            })
        
    }
    
    renderTableData() {
        return this.state.data.map((data, index) => {
           let { date, result } = data //destructuring
           date = new Date(date)
           return (
              <tr key={date}>
                  <td>{date.getUTCFullYear()+"-"+ (date.getMonth()+1)+"-"+date.getDate()}</td>
                 <td>{result}</td> 
              </tr>
           )
        })
     }
    
    render() { 
        
        return(
            
            <div className="container" style={{ marginTop: "5px"}}>
            <h1>Employee Home Page</h1>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                    <th>Date</th>
                    <th>Result</th>
                    </tr>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>);
    }
}
 
export default EmployeeHomePage;