import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom'


import Navbar from './Navbar'
import Calendar from './Calendar'
import Meetings from './Meetings'
import Signup from './Signup'

import {loginService, calendarService, getAllUsersService} from '../services/services'

const MeetingswithRouter = withRouter(Meetings)
const NavbarwithRouter = withRouter(Navbar)

class App extends Component {
  constructor() {
    super()
    this.state= {
      loggedinornot : false,
      email: '',
      name: '',
      allUsers: []
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

 async login(email,pwd) {
    let userdata =  await loginService(email,pwd)

    if(userdata && !this.state.loggedinornot) {
      
    localStorage.setItem("meetingsAppToken", userdata.token);
    //console.log(localStorage.getItem("meetingsAppToken"))
        this.setState({
        loggedinornot : true,
        email : userdata.user.email,
        name  : userdata.user.name
      })
    }
    
  }

  async getusers() {
    await getAllUsersService().then(res => {
      this.setState({
        ...this.state,
        allUsers: res
      },console.log(this.state))
    })
  }

  logout() {

    if(this.state.loggedinornot) {

      localStorage.removeItem("meetingsAppToken")
      console.log(localStorage.getItem("meetingsAppToken"))
      
      this.setState({
        loggedinornot: false,
        email: null,
        name: null
      })
    }
  }

  render() {

    return (
      <div className="App">
         <Route path="/">
            <NavbarwithRouter loggedinornot={this.state.loggedinornot} name={this.state.name} login={this.login} logout={this.logout} />
         </Route>
         <div className="body-container">
            <Route path="/" exact>
                <Signup />
            </Route>
            <Route path="/calendar">
                <Calendar />
            </Route>
            <Route path="/meetings" component={MeetingswithRouter}/>
         </div>
         
      </div>
    );
  }
}

export default App;


