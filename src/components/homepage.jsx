import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import EmployeeHome from './employeeHomePage';
import LabHome from './labHome';
import LoginPage from './loginPage';
import TestCollectionPage from './testCollectionPage';
import PoolMappingPage from './poolMappingPage';
import WellTestingPage from './wellTestingPage';
import EmployeeLoginPage from './employeeLoginPage';

class HompePage extends Component {
    state = {  }
    render() { 
        return ( 
            <Router className='container'>
                <div>
                    HOME PAGE
                </div>
                <Route path="/loginPage" component={LoginPage}></Route>
                <Route path="/labHome" component={LabHome}></Route>
                <Route path='/testCollectionPage' component={TestCollectionPage}></Route>
                <Route path='/poolMappingPage' component={PoolMappingPage}></Route>
                <Route path="./wellTestingPage" component={WellTestingPage}></Route>
                <Route path="./employeeLoginPage" component={EmployeeLoginPage}></Route>
                <Route path="/employeeHome/:employeeID" component={EmployeeHome}></Route>
            </Router>
         );
    }
}
 
export default HompePage;