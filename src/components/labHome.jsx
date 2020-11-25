import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class LabHome extends Component {
    state = {}
    render() {
        return (<div className="Buttons">
            <h1 style={{textAlign: 'center', fontSize: 20, backgroundColor: 'LightBlue'}}> LAB HOME </h1>
            <NavLink to="/poolMappingPage">
                <Button variant="secondary" size="lg" block style={{marginTop: 20, fontSize:30, backgroundColor:'Rose', fontFamily:'initial'}}>
                    Pool Mapping
                </Button>
            </NavLink>
            
            <NavLink to="/wellTestingPage">
                <Button variant="secondary" size="lg" block style={{marginTop: 20, fontSize:30, backgroundColor:'Rose', fontFamily:'initial'}}>
                    Well Testing
                </Button>
            </NavLink>
        </div>);
    }
}


export default LabHome;