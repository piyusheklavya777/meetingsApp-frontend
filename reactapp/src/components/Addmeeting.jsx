import React, { Component } from 'react';
import './Addmeeting.css'
import {addmeetingService,  getAllUsersService} from '../services/services'

import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import { Multiselect } from 'multiselect-react-dropdown';

class Addmeeting extends Component {
    constructor(props) {
        super(props)
        this.state = {

            isValid: true,
            values : {
                title: null,
                description: null,
                date: null,//(new Date()).toDateString(),
                start: '',// (new Date()).toTimeString(),
                end: null,//(new Date()).toTimeString(),
                membersOption:[{name: 'Srigar', id: 1},{name: 'Sam', id: 2}],
                members: []
            },
            errors : {
                title: [],
                description: [],
                date:[],
                start:[],
                end: [],
                members:[]
            }
        }
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.addmeeting = this.addmeeting.bind(this)
    }


    updateValue = (event) => { //kok cannot do push : members
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name] : event.target.value
            }
        },this.validate)
    }

    updateStart = (time) => { 
        this.setState({
            values: {
                ...this.state.values,
                start : time
            }
        },this.validate)
    }

    updateEnd = (time) => { 
        this.setState({
            values: {
                ...this.state.values,
                end : time
            }
        },this.validate)
    }

    updateDate = (date) => {
        this.setState({
            values: {
                ...this.state.values,
                date : date
            }
        },this.validate)

    }

    onSelect(selectedList, selectedItem) {
        this.setState({
            values:{
                ...this.state.values,
                members: selectedList.map(x=>x.email)
            }
        })
    }
     
    onRemove(selectedList, removedItem) {
        this.setState({
            values:{
                ...this.state.values,
                members: selectedList.filter(x=>{return (x.email===removedItem.email)})
            }
        })
    }

    validate = () => {
        // const {values: {title, description, date, start, end, members}} = this.state;

        const errors = {
            title: [],
            date:[],
            start:[],
            end:[]
        }
        let isValid = true;

         //name
         if( ! ( /^[a-zA-Z ]{2,30}$/.test( this.state.values.title ) ) ) {
            errors.title.push( 'Title: 2-30 chars' );
            isValid = false;
        }
        if( this.state.values.start === '' ) {
            console.log(this.state.values)
            errors.start.push( 'Start Time Empty' );
            isValid = false;
        }
        //description can be empty //by default today's date, so no validation req. //by default now's time. // backlog: implement default end time as 1 hr later

        this.setState({
            ...this.state,
            errors,
            isValid
        });
        console.log(this.state.values)

    }

    addmeeting = async () => {
        const meetingObj = {

            title: this.state.values.title,
            description: this.state.values.description,
            MeetingDate: this.state.values.date,
            attendees: this.state.values.members,
            startTime: this.state.values.start+":00 GMT+0530 (India Standard Time)",
            endTime: this.state.values.end+":00 GMT+0530 (India Standard Time)",
        }
        

        console.log('final: ', meetingObj)
        await addmeetingService(meetingObj).then(res=> {
            console.log(res)
        
        }).then(this.validate)
    }

    componentDidMount() {
        getAllUsersService().then(res => {
            this.setState({
                ...this.state,
                values: {
                    membersOption : res
                }
            }, console.log('gogo'))
        })
    }

    

    render() {
        console.log('srr', this.state.values)
        const {values: {title, description, date, start, end, members, membersOption}} = this.state;
        return (

            <div className="add-meeting">
                 <input type="text" placeholder="title" className="input-any input-title" name="title" value={title} onChange={this.updateValue}/>
             
                 <textarea type="text" placeholder="description" className="input-any input-description" name="description" value={description} onChange={this.updateValue}/>

                 <div className="pick-date-time">
                        <p className="picker-label">Select date</p>
                        <DatePicker className="date-add" name="date"
                         onChange={this.updateDate}
                         value={date}
                        />
                        <p className="picker-label">Select start time</p>
                        <TimePicker className="time-add" name="start"
                        onChange={this.updateStart}
                        value={start}
                        />
                        <p className="picker-label">Select end time</p>
                        <TimePicker className="time-add" name="end"
                        onChange={this.updateEnd}
                        value={end}
                        />
                 </div>
                 <p className="picker-label">Add members</p>

                 <Multiselect
                    options={this.state.values.membersOption} // Options to display in the dropdown
                   // selectedValues={this.state.values.selectedValue} // Preselected value to persist in dropdown
                    onSelect={this.onSelect} // Function will trigger on select event
                    onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    />
                
                    <button onClick={this.addmeeting} className="add-btn" disabled={!this.state.isValid}>Create new Meeting</button>
                

            </div>
                
        );
    }
}

export default Addmeeting;