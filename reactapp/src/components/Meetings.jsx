import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom'

import Addmeeting from './Addmeeting'
import Showmeetings from './Showmeetings' 


class Meetings extends Component {
    render() {
        return (
            <div>
                <div>
                <base href="..." />
                    <Link to={this.props.match.url}>show meetings</Link>
                    <br/>
                    <Link to={`${this.props.match.url}/add`}> Add meeting</Link>
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