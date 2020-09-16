import React, { Component } from 'react';
import './Addmeeting.css'
import {addmeetingService} from '../services/services'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'

class Addmeeting extends Component {
    constructor(props) {
        super(props)
        this.state = {

            isValid: false,
            values : {
                name: null,
                password: '',
                confirmPassword : null,
                email: null,
            },
            errors : {
                name: [],
                password: [],
                email: [],
                confirmPassword: []
            }
        }
    }

    updateValue = (event) => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name] : event.target.value
            }
        },this.validate)
    }

    validate = () => {
        const {values: {name, email, password, confirmPassword}} = this.state;

        const errors = {
            name : [],
            email: [],
            password: [],
            confirmPassword: []

        }
        let isValid = true;

         //name
         if( ! ( /^[a-zA-Z ]{2,30}$/.test( name ) ) ) {
            errors.name.push( 'Name: 2-30 chars' );
            isValid = false;
        }

        if( ! ( /^[a-zA-Z ]{2,30}$/.test( name ) ) ) {
            errors.password.push( 'Password: 2-30 chars' );
            isValid = false;
        }

        if( ! ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( email ) ) ) {
            errors.email.push( 'Enter a valid email address' );
            isValid = false;
        }

        if(password !== confirmPassword) {
            errors.confirmPassword.push( 'Password & confirm password do not match' );
            isValid = false;
        }

        this.setState({
            errors,
            isValid
        });

    }

    signup = async (event) => {
        event.preventDefault();
        console.log('yo')

        const signupObj = {

            name: this.state.values.name,
            email: this.state.values.email,
            password: this.state.values.password

        }
        await addmeetingService(signupObj).then(res=> {
            console.log(res)
        })
    }

    render() {
        const {values: {name, email, password, confirmPassword}} = this.state;
        const {errors: {name:nameErr, email:emailErr, password:passwordErr, confirmPassword:confirmPasswordErr}} = this.state;
        return (

            <div className="add-meeting">
                 <input type="text" placeholder="title" className="input-any input-title" name="title" value={name} onChange={this.updateValue}/>
             
                 <textarea type="text" placeholder="description" className="input-any input-description" name="title" value={name} onChange={this.updateValue}/>

                 <div className="pick-date-time">
                        <p className="picker-label">Select date</p>
                        <DatePicker className="date-add"
                        // onChange={setDate}
                        // value={date}
                        />
                        <p className="picker-label">Select start time</p>
                        <TimePicker className="time-add"
                        //onChange={}
                        //value={}
                        />
                        <p className="picker-label">Select end time</p>
                        <TimePicker className="time-add"
                        //onChange={}
                        //value={}
                        />
                 </div>
                 <p className="picker-label">Add members</p>
                        <input type="text"
                            data-role="taginput"
                            data-cls-tag-title="text-bold fg-white"
                            data-cls-tag="bg-olive"
                            data-cls-tag-remover="bg-darkOlive fg-white"
                            value="css, javascript, html, Metro 4"/>

            </div>
                
        );
    }
}

export default Addmeeting;