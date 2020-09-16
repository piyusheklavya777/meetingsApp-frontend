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

        let topNav = (
            <div className="nav-top">
                <div className="nav-top-left">
                    <p className="nav-top-left-text">meetingsApp</p>
                </div>
                <div className="nav-top-right">
                    {
                        this.props.loggedinornot?
                        <React.Fragment>
                            <p className="nav-top-left-text">Hi {this.props.name} </p>
                            <input type="button" className="nav-top-right-btn" onClick={logoutHelper} value="logout"/>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <input type="text" name="emailtext" placeholder="email" className="nav-top-right-input" onChange={this.onWriteEmail} value={this.state.email} />
                            <input type="password" name="passwordtext" placeholder="password" className="nav-top-right-input" onChange={this.onWritePassword} value={this.state.password} />
                            <input type="button" className="nav-top-right-btn" onClick={loginHelper} value="login"/>
                        </React.Fragment>
                    }

                </div>            

               


            </div>     
         )


        return (
            <div className="container-navbar">
                <div>
                    {topNav}
                </div>
                <div className="nav-bottom">
                    <ul className="nav-bottom-ul">
                        <li className="nav-bottom-li">
                            <Link to="/meetings"> <a href="">Meetings</a></Link>
                        </li>
                        <li className="nav-bottom-li">
                             <Link to="/calendar"> <a href="">Calendar</a> </Link>
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