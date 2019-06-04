import axios from 'axios'

export const register = newUser => {
    return axios
        .post('api/register', newUser, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(  (error) => {
            alert(error)
        })
}   

export const login = user => {
    return axios
        .post(
            'api/login',
            {
                email: user.email,
                password: user.password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            // console.log(response)
            localStorage.setItem('usertoken', response.data.token)
            localStorage.setItem('username', response.data.user.fname + ' ' +response.data.user.lname)
            // console.log(response.data)
            // console.log(response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProfile = () => {
    return axios
        .get('api/profile', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            // console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}
