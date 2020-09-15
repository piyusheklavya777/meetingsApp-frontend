import React, { Component } from 'react';
import {Route, Switch, Link, withRouter} from 'react-router-dom'
import './Navbar.css'

import Meetings from './Meetings'
import Calendar from './Calendar'

const MeetingswithRouter = withRouter(Meetings)
const CalendarwithRouter = withRouter(Calendar)

class Navbar extends Component {

    render(props) {

        const loginHelper = this.props.login
        const logoutHelper = this.props.logout

        let topNavGuest = (
            <>
            <input type="text" name="emailtext" placeholder="email" className="nav-top-input"/>
            <input type="password" name="passwordtext" placeholder="password" className="nav-top-input"/>
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