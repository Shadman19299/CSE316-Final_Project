import React, { Component } from 'react';
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'

class EmployeeLoginPage extends Component{
    state = { 
        email: '',
        password: ''
     }

     onEmailChange = (event)=>{
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event)=>{
        this.setState({password: event.target.value});
    }

    submitLogin = (event)=>{
        event.preventDefault();
        
        let email = this.state.email;
        let password = this.state.password;
        
        axios.get('/employeeLogin/'+email+'/'+password)
        .then(response => {
            if(response.data.employeeID){
                window.location = '/employeeHome/'+response.data.employeeID;
            }
            else{
                alert("Invalid Email or Password");
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() { 
        return (
            <div className="container">
                <h1 style={{textAlign: "center", marginBottom: "20px", marginTop: "20px"}}>Employee Login Page</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.onEmailChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.onPasswordChange}/>
                    </Form.Group>
                    
                    <Button variant="secondary" type="submit" onClick={this.submitLogin}>
                        Login
                    </Button>
                </Form>
            </div>
         );
    }


}

export default EmployeeLoginPage;