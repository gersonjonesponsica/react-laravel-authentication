import React, { Component } from 'react'
import Navbar from '../Navbar'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../react-bootstrap-table.css'
import axios from 'axios'
import { Button, Modal, Form  } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {getTasks, createTask , getTask, updateTask} from '../Functions/TaskFunctions'

const MySwal = withReactContent(Swal)


// It's a data format example.

class Task extends Component {
  constructor(props){
    super(props)
    this.state = {
      tasks : [],
      title: '',
      task: {},
      show: false,
      isLoading: false,
      editMode: false,
      errors : []
    }

    this.options = {
      defaultSortName: 'created_at',  // default sort column name
      defaultSortOrder: 'desc'  // default sort order
    };

    this.handleShowAddForm = this.handleShowAddForm.bind(this)
    this.handleShowEditForm = this.handleShowEditForm.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.addTask = this.addTask.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.loadTask = this.loadTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  componentDidMount(){
    this.loadTask()
  }

  // componentDidUpdate(){
  //   this.loadTask()
  // }

  loadTask(){
    getTasks().then(res => {
      this.setState({ tasks: res})
    })
  }

  handleClose(){
    this.setState({show: false})
    this.setState({title: ''})
    this.setState({task : {} })
    this.setState({errors : {} })
  }

  handleShowAddForm(){
    this.setState({editMode: false})
    this.setState({show: true})
  }

  handleShowEditForm(id){
    this.setState({editMode: true})
    getTask(id).then(res => {
      this.setState({task : res})
      this.setState({title : res.title})
    })
    this.setState({show: true})
  }
  
  addTask(){
    this.onSubmit();
  }

  updateTask(){
    this.onSubmit();
  }

  hasErrorFor (field) {
    return !!this.state.errors[field]
  }
  
  renderErrorFor (field) {
    if (this.hasErrorFor(field)) {
        return (
        <span className='invalid-feedback'>
            <strong>{this.state.errors[field][0]}</strong>
        </span>
        )
    }
  }



  onSubmit() {
    // e.preventDefault()
    this.setState({isLoading: true})
    const newTask = !this.state.editMode ? { title: this.state.title } :{ title : this.state.title, id : this.state.task.id}

    if(!this.state.editMode){
      createTask(newTask)
      .then(res => {
        if(res.status == 201){
          MySwal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Task added successfully',
            showConfirmButton: false,
            timer: 2500
          })
          
        this.handleClose()
        this.loadTask()
        }else{
          // console.log(res.data)

          this.setState({
              errors: res.data
          })
        }
      })
      .catch(  (error) => {
          console.log(error)
          // alert(error)
          MySwal.fire({
            position: 'top-end',
            type: 'error',
            title: 'There is an error',
            showConfirmButton: false,
            timer: 2500
          })
      })
    }else{
      updateTask(newTask).then(res => {
        console.log(res)
        if(res.status == 204){
          MySwal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Task updated successfully',
            showConfirmButton: false,
            timer: 2500
          })
          this.loadTask()
          this.handleClose()
        }else{
          this.setState({
              errors: res.data
          })
        }
      })
      .catch(  (error) => {
          // alert(error)
          MySwal.fire({
            position: 'top-end',
            type: 'error',
            title: 'There is an error',
            showConfirmButton: false,
            timer: 2500
          })
      })
    }
    this.setState({ isLoading: false });
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }
  
  deleteTask(id){
    // alert('delete: '+ id)
    axios.delete('api/tasks/'+id,{
      headers: { 
        Authorization: `Bearer ${localStorage.usertoken}`
      }
    }).then(response => {
      if(response.data == 204){
        // console.log(response.data)
        this.loadTask()
        MySwal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Task added deleted',
          showConfirmButton: false,
          timer: 2500
        })
      }else{
        alert('refresh page')
      }
    }).catch((error) => {
      alert('refresh page')
    })
  }

  actionFormat(cell, row){
    // console.log(row.id)
    return(
      <div>
        <button onClick={ () => 
            this.deleteTask(row.id)}><i className='fa fa-trash text-danger'></i></button> 
          <button onClick={ () => 
            this.handleShowEditForm(row.id)}><i className='fa fa-edit'></i></button>
      </div>
    )
  }

  render() {
    const { isLoading, tasks, show, editMode , title} = this.state;
    return (
      <div>
      <Navbar />
        <div className="container">
          <h1 className="display-4">Task</h1>
          <Button 
            variant="primary" 
            className='float-right' onClick={this.handleShowAddForm}>
              + Add Task
          </Button>
          <BootstrapTable 
            options = {this.options} 
            data={tasks} 
            striped 
            hover 
            condensed 
            pagination 
            search >
                <TableHeaderColumn dataField="id" isKey={true} dataSort dataAlign="center">Task ID</TableHeaderColumn>
                <TableHeaderColumn dataField="title" dataSort >Title</TableHeaderColumn>
                <TableHeaderColumn dataField="created_at" dataSort >Created date</TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.actionFormat.bind(this)} dataAlign="center" width='10%'>
                  Action
                </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{(!editMode ?'Add task' : 'Update task')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Task name</Form.Label>
                <Form.Control 
                  value={this.state.title} 
                  type="text" 
                  name='title' 
                  placeholder="Enter task" 
                  onChange={this.onChange.bind(this)} 
                  className={`${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                />
                {this.renderErrorFor('title')}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button 
              variant="primary"
              onClick={!isLoading ? (!editMode ? this.addTask : this.updateTask ) : null} 
              disabled={isLoading}
            >
              {isLoading ? 'Adding..' : (!editMode ?'Add task' : 'Update task')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>      
    )
  }
}

export default Task
