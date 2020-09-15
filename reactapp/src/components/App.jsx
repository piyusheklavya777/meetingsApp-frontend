import React from 'react';
import './App.css';
import { Route, Router, withRouter } from 'react-router-dom'

import Navbar from './Navbar'
import Calendar from './Calendar'
import Meetings from './Meetings'
import Signup from './Signup'

const MeetingswithRouter = withRouter(Meetings)
const NavbarwithRouter = withRouter(Navbar)

function App(props) {
  return (
    <div className="App">
       <Route path="/" component={NavbarwithRouter}/>
       <Route path="/" exact>
          <Signup />
       </Route>
       <Route path="/calendar">
          <Calendar/>
       </Route>
       <Route path="/meetings" component={MeetingswithRouter}/>
       
    </div>
  );
}

export default App;
