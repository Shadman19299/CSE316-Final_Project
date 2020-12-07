import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class LabHome extends Component {
    state = {}
    render() {
        return (<div className="Buttons">
            <h1 style={{textAlign: "center", marginBottom: "3%", marginTop: "5%"}}> Lab Home </h1>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ButtonGroup vertical>
                    <NavLink to="/poolMappingPage">
                        <Button variant="secondary" className="mb-3" size='lg' style={{width:300}}>
                            Pool Mapping
                        </Button>
                    </NavLink>
                
                    <NavLink to="/wellTestingPage">
                        <Button variant="secondary" className="mb-3" size='lg' style={{width:300}}>
                            Well Testing
                        </Button>
                    </NavLink>
                </ButtonGroup>
            </div>
            {/* <table align= "center">
                <tr align='center'>
            <NavLink to="/poolMappingPage">
                <Button variant="secondary" size="lg"  style={{padding:20, textAlign: "center", marginBottom: "20px", fontSize:30, fontFamily:'initial'}}>
                    Pool Mapping
                </Button>
            </NavLink>
                </tr>
                <tr align='center'>
            <NavLink to="/wellTestingPage">
                <Button variant="secondary" size="lg"  style={{padding:20,textAlign: "center", marginBottom: "20px", fontSize:30, fontFamily:'initial'}}>
                    Well Testing
                </Button>
            </NavLink>
            </tr>
            </table> */}
        </div>);
    }
}


export default LabHome;