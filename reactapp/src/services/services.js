import axios from 'axios'

const baseurl = 'http://localhost:3000/api'

const loginService = (email, password) => {

    let loginobj = {
        email : "andyy@telstra.com",
        password : "andy123"
    }
    return axios.post( 
        `${baseurl}/login`,
        loginobj, 
        {
            headers: {}
        }
    ).then(response => response.data)
}

export {
    loginService
}

// axios.post('http://yourendpoint',data,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
//             .then(response=> console.log(response))
//             .catch(error => console.log(error));
//    };