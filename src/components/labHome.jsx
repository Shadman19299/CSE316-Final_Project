import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class LabHome extends Component {
    state = {}
    render() {
        return (<div className="Buttons">
            <h1 style={{textAlign: "center", marginBottom: "20px"}}> LAB HOME </h1>
            <table align= "center">
                <tr align='center'>
            <NavLink to="/poolMappingPage">
                <Button variant="secondary" size="lg"  style={{padding:20, textAlign: "center", marginBottom: "20px", fontSize:30, fontFamily:'initial'}}>
                    Pool Mapping
                </Button>
            </NavLink>
                </tr>
                <tr align='center'>
            <NavLink to="/wellTestingPage">
                <Button variant="secondary" size="lg"  style={{padding:20,textAlign: "center", marginBottom: "20px", fontSize:30,fontFamily:'initial'}}>
                    Well Testing
                </Button>
            </NavLink>
            </tr>
            </table>
        </div>);
    }
}


export default LabHome;