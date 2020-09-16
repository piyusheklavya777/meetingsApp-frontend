import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom'

import Addmeeting from './Addmeeting'
import Showmeetings from './Showmeetings' 
import './Meetings.css'


class Meetings extends Component {

    constructor(props) {
        super(props)
        this.state= {
            meetings:null
        }
    }

    render() {
        return (
            <div>
                <div>
                <base href="..." />
                    <Link to={this.props.match.url} className="meetings-show-all-meetings" >Showing all meetings</Link>
                    
                    <Link to={`${this.props.match.url}/add`} className="meetings-add-meetings" > Add meeting</Link>
                </div> <hr/>
                <div>
                    <Switch>
                        <Route path ={`${this.props.match.url}/add`} component={Addmeeting}/>
                        <Route path ={this.props.match.url} component={Showmeetings}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Meetings;