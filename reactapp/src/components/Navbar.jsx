import React, { Component } from 'react';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import './Navbar.css'

import Meetings from './Meetings'
import Calendar from './Calendar'

const MeetingswithRouter = withRouter(Meetings)
const CalendarwithRouter = withRouter(Calendar)

class Navbar extends Component {

    constructor() {
        super()
        this.state={
            email: '',
            password: ''
        }
        this.onWriteEmail = this.onWriteEmail.bind(this)
        this.onWritePassword = this.onWritePassword.bind(this)
      }
    

    onWriteEmail(evt) {
        this.setState({
            email: evt.target.value
        })
    }
    onWritePassword(evt) {
        this.setState({
            password: evt.target.value
        })
    }

    render(props) {

        const loginHelper = () => this.props.login(this.state.email, this.state.password)
        const logoutHelper = this.props.logout

        let topNavGuest = (
            <>
            <input type="text" name="emailtext" placeholder="email" className="nav-top-input" onChange={this.onWriteEmail} value={this.state.email} />
            <input type="password" name="passwordtext" placeholder="password" className="nav-top-input" onChange={this.onWritePassword} value={this.state.password} />
            <input type="button" onClick={loginHelper} value="login"/>
            </>     
        )

        let topNavUser = ( 
              <React.Fragment>
                  <h3>Hi {this.props.name}</h3>
              <input type="button" value="logout" onClick={logoutHelper} /> 
              </React.Fragment>
          )

        return (
            <div className="container">
                <div className="top">
                        {this.props.loggedinornot?topNavUser:topNavGuest}                   
                </div>
                <div className="bottom">
                    <ul>
                        <li className="nav-btn">
                            <Link to="/meetings">Meetings</Link>
                        </li>
                        <li className="nav-btn">
                             <Link to="/calendar"> Calendar</Link>
                        </li>
                        <div>
                            <Switch>
                                <Route path = {`${this.props.match.url}/meetings`} component={MeetingswithRouter}/>
                                <Route path = {`${this.props.match.url}/calendar`} component={CalendarwithRouter}/>
                            </Switch>
                        </div>
            
                    </ul>
                </div>
            </div>


                
        );
    }

}

export default Navbar;