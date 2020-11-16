import React from 'react';
import Login from './components/login';
import LandingPage from './components/landing';
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom';
const App = () => (
  <Router>
    <Route path ="/" exact component= {Login}/>
    <Route path ="/landingPage" component= {LandingPage}/>
  </Router>

  
);
export default App;