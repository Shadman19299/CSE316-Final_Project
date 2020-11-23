import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class LabHome extends Component {
    state = {}
    render() {
        return (<div className="Buttons">
            <title> LAB HOME PAGE </title>
            <NavLink to="/poolMappingPage">
                <Button variant="link" size="lg" block>
                    Pool Mapping
  </Button></NavLink>
            <NavLink to="/wellTestingPage">
                <Button variant="" size="lg" block>
                    Well Testing
  </Button>
            </NavLink>
        </div>);
    }
}

export default LabHome;