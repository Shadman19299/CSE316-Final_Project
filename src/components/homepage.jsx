import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

class HompePage extends Component {
    state = {  }
    render() { 
        return ( 
            <Router className='container'>
                <div>
                    HOME PAGE
                </div>
                <Route></Route>
                <Route></Route>
                <Route></Route>
                <Route></Route>
            </Router>
         );
    }
}
 
export default HompePage;