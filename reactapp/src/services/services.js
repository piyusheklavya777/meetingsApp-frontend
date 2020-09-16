import axios from 'axios'
const protocol = 'http'
const url = 'localhost:3000/api'
const baseurl = protocol+'://'+url

const loginService = (email, password) => {

    let loginobj = {
        email : email,
        password : password
    }
    let andy = {
        email: 'andy@telstra.com',
        password: 'andy123'
    }
    return axios.post( 
        `${baseurl}/login`,
        loginobj.email && loginobj.password?loginobj:andy, 
        {
            headers: {}
        }
    ).then(response => response.data)
}

const calendarService = (date) => {
     console.log('date in service',date)
     
    return axios.get(`${baseurl}/calendar`,{params:{MeetingDate:date} ,headers: { Authorization:localStorage.getItem('meetingsAppToken') } })
     .then(response => response.data)
     .catch(error => console.log(error));
   
}
//{ date:date, search_terms: search_terms } //date, search_terms

const meetingsService = (obj) => {
   
   return axios.get(`${baseurl}/meetings`,{params: obj, headers: { Authorization:localStorage.getItem('meetingsAppToken') } })
    .then(response => response )
    .catch(error => console.log(error));
  
}

const getAllUsersService = (obj) => {
   
    return axios.get(`${baseurl}/users`,)
     .then(response => {console.log(response.data); return response.data} )
     .catch(error => console.log(error));
   
 }

const signupService = (data) => {
   
    return axios.post(`${baseurl}/signup`,data )
     .then(response => response.data )
     .catch(error => console.log(error));
   
 }

 const excusemyselfService = (meetingId) => {

    return axios.post(`${baseurl}/meetings/leaveme`,{meetingId: meetingId},{headers: { Authorization:localStorage.getItem('meetingsAppToken') }} )
    .then(response => response.data )
    .catch(error => console.log(error))
 }

 const addmeetingService = (meetingObj) => {

    return axios.post(`${baseurl}/meetings/leaveme`,meetingObj,{headers: { Authorization:localStorage.getItem('meetingsAppToken') }} )
    .then(response => response.data )
    .catch(error => console.log(error))
 }

export {
    loginService,
    calendarService,
    signupService,
    meetingsService,
    getAllUsersService,
    excusemyselfService,
    addmeetingService
    
}