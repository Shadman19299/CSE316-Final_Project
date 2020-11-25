import React, { Component } from 'react';
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'

class LoginPage extends Component {
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

    submitCollector = (event)=>{
        event.preventDefault();
        var email = this.state.email;
        var password = this.state.password;
    
        axios.get('/loginOne/'+email+'/'+password)
            .then(response => {
                if(response.data.isValid === 'valid'){
                    window.location = '/testCollectionPage'
                }
                else{
                    alert("Invalid Email or Password");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    submitLab = (event)=>{
        event.preventDefault();
        
        var email = this.state.email;
        var password = this.state.password;
        
        axios.get('/loginOne/'+email+'/'+password)
        .then(response => {
            if(response.data.isValid === 'valid'){
                window.location = '/labHome'
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
                <h1 style={{textAlign: "center", marginBottom: "20px", marginTop: "20px"}}>Login Page</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.onEmailChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.onPasswordChange}/>
                    </Form.Group>
                    
                    <Button className="mr-3" variant="secondary" type="submit" onClick={this.submitCollector}>
                        Login Collector
                    </Button>
                    <Button variant="secondary" type="submit" onClick={this.submitLab}>
                        Lab Login
                    </Button>
                </Form>
            </div>
         );
    }
}

export default LoginPage;