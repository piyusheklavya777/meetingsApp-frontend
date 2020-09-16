import React, { Component } from 'react';
import './Signup.css'
import {signupService} from '../services/services'

class Signup extends Component {
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
        await signupService(signupObj).then(alert('SignUp successful ! Login Now'))
    }

    render() {
        const {values: {name, email, password, confirmPassword}} = this.state;
        const {errors: {name:nameErr, email:emailErr, password:passwordErr, confirmPassword:confirmPasswordErr}} = this.state;
        return (

            <div class="login-page">
                <div class="form">
                <form class="login-form" onSubmit={this.signup} >

                    <input type="text" placeholder="name" name="name" value={name} onChange={this.updateValue}/>
                    {nameErr.map( err => <small class="text-danger">{err}</small> )}

                    <input type="text" placeholder="email" name="email" value={email} onChange={this.updateValue} />
                    {emailErr.map( err => <small class="text-danger">{err}</small> )}

                    <input type="password" placeholder="password" name="password" value={password} onChange={this.updateValue}/>
                    {passwordErr.map( err => <small class="text-danger">{err}</small> )}

                    <input type="password" placeholder="confirm password"  name="confirmPassword" value={confirmPassword} onChange={this.updateValue}/>
                    {confirmPasswordErr.map( err => <small class="text-danger">{err}</small> )}

                    <button type="submit" className="btn btn-primary mr-2" disabled={!this.state.isValid} >sign up</button>
                    <p class="message">If already registered, login at page's top</p>

                </form>
                
                </div>
          </div>
        );
    }
}

export default Signup;