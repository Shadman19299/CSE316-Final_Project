import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap'

import EmployeeHome from './employeeHomePage';
import LabHome from './labHome';
import LoginPage from './loginPage';
import TestCollectionPage from './testCollectionPage';
import PoolMappingPage from './poolMappingPage';
import WellTestingPage from './wellTestingPage';
import HomePageBody from './homePageBody';
import EmployeeLoginPage from './employeeLoginPage';

class HompePage extends Component {
    state = {  }
    render() { 
        return ( 
            
            <Router className='container'>
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href='/'>Welcome To SBU Testing Site</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href='/employeeLoginPage'>Employee Log In</Nav.Link>
                            <Nav.Link href="/loginPage">Lab Log In</Nav.Link>
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route path="/" exact component={HomePageBody}></Route>
                        <Route path="/loginPage" exact component={LoginPage}></Route>
                        <Route path="/labHome" component={LabHome}></Route>
                        <Route path='/testCollectionPage' component={TestCollectionPage}></Route>
                        <Route path='/poolMappingPage' component={PoolMappingPage}></Route>
                        <Route path="/wellTestingPage" exact component={WellTestingPage}></Route>
                        <Route path="/employeeLoginPage" component={EmployeeLoginPage}></Route>
                        <Route path="/employeeHome/:employeeID" component={EmployeeHome}></Route>
                    </Switch>
                </div>
            </Router>
         );
    }
}
 
export default HompePage;