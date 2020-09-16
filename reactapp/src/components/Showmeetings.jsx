import React, { Component } from 'react';
import './Showmeetings.css'

import {meetingsService, getAllUsersService, excusemyselfService} from '../services/services'

class Showmeetings extends Component {

    constructor(props) {
        super(props)

        this.state= {
            meetings: [],
            datefilter:'TODAY',
            search_terms: 'X2',
            allusers: [],
            newMember: ''
        }

        this.today = this.today.bind(this)
        this.past = this.past.bind(this)
        this.future= this.future.bind(this)
        this.textChanged = this.textChanged.bind(this)
        this.fetchdata = this.fetchdata.bind(this)
        // this.getall = this.getall.bind(this)

        // this.getall()
    }

textChanged = (event) => {
    this.setState({
        ...this.state,
        [event.target.name] : event.target.value
    },this.fetchdata)
}

today = () => {
    this.setState({
        ...this.state,
        datefilter : 'TODAY'
    }, this.fetchdata)
}
past = () => {
    this.setState({
        ...this.state,
        datefilter : 'PAST'
    }, this.fetchdata)
}

future = () => {
    this.setState({
        ...this.state,
        datefilter : 'FUTURE'
    }, this.fetchdata)
}

fetchdata = async () => {

    const searchObj = {
        datefilter: this.state.datefilter,
        search_terms: this.state.search_terms
    }
    await meetingsService(searchObj).then(res => {
        this.setState({
            ...this.state,
            meetings: res.data
        })
    })
}

// getall = async () => {
//     await getAllUsersService().then(res=>(
//         this.setState({
//             ...this.state,
//             allusers : res.data
//         }, console.log(this.state.allusers))
//     ))
// }

// addAttendee = async () => {
    
// }

excusemyself = async (id) => {
// console.log(id)
    await excusemyselfService(id).then(this.fetchdata())
    
}

card = (eachMeet, key) => { //console.log(eachMeet)
    return (
        <div className="meetings-card" key={key} >
            
            <p className="meeting-title">{eachMeet.title}</p>
            <p className="meeting-description">{eachMeet.description}</p>
            <p className="meeting-date">{eachMeet.MeetingDate}</p>
            <div className="add-member-to-meet">
                 {/* <form class="login-form" onSubmit={this.addAttendee} >
                    <input type="text" placeholder="name" name="newMember" value={this.state.newMember} onChange={this.textChanged}/>
                    <button type="submit" className="btn btn-primary mr-2" disabled={!this.state.isValid} >sign up</button>
                 </form> */}
            </div>
            <input type="button" className="leave-me-out-btn" onClick={()=>{this.excusemyself(eachMeet._id)}} value="excuse myself"/>
            <ul>
                {eachMeet.attendees.map(member=> {return <li>{member}</li>  })}
            </ul>
            
        
        </div>
    )
}

    render() {
        return (
        <>
            <div className="filter-container">
                <input type="text" className="searchterms-input" placeholder="search term here" value={this.state.search_terms} name="search_terms" onChange={this.textChanged} />
                <nav role="navigation" className="timefilter">
                    <ul>
                        
                        <li><a >TIME FILTER</a>
                        <ul class="dropdown">
                            <li><a   onClick={this.today} >Today</a></li>
                            <li><a   onClick={this.past}> PAST </a></li>
                            <li><a   onClick={this.future}> FUTURE </a></li>
                        </ul>
                        </li>
                        
                    </ul>
                </nav> <br/>
            </div>
            <div className="meetings-grid-container">
                {
                    this.state.meetings.map((eachMeet,key)=>{return this.card(eachMeet, key)})
                }

            </div>
        </>
        );
    }

}

export default Showmeetings;