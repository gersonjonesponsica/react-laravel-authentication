import axios from 'axios'

export const createTask = (task) => {
    return axios
    .post('api/tasks', task, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.usertoken}`
        }
    })
}

export const getTasks = () => {
    return axios
        .get('api/tasks')
        .then(res => {
        // console.log(res.data)
        return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getTask = (id) => {
    return axios
    .get('api/tasks/'+id,{
        headers: { 
          Authorization: `Bearer ${localStorage.usertoken}`
        }
    }).then(res =>{
        // this.setState({task_ : res.data.title})
        // console.log(res.data)
        return res.data
    })
    .catch(err => {
        return err.response.data.data
    })
}

export const updateTask = (task) => {
    return axios
    .put('api/tasks/'+task.id, task, {
        headers: { 
            Authorization: `Bearer ${localStorage.usertoken}`,
            'Content-Type': 'application/json',
          }
    })
}