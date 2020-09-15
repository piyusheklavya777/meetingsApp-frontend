import React, { Component } from 'react';
import {Route, Switch, Link, withRouter} from 'react-router-dom'

import Meetings from './Meetings'
import Calendar from './Calendar'

const MeetingswithRouter = withRouter(Meetings)
const CalendarwithRouter = withRouter(Calendar)

class Navbar extends Component {
    render(props) {
        console.log('url',this.props.match.url)
        return (
            <div>
                <div>
                    <Link to="/meetings">Meetings</Link>
                    <br/>
                    <Link to="/calendar"> Calendar</Link>
                </div> <hr/>
                <div>
                    <Switch>
                        <Route path = {`${this.props.match.url}/meetings`} component={MeetingswithRouter}/>
                        <Route path = {`${this.props.match.url}/calendar`} component={CalendarwithRouter}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Navbar;