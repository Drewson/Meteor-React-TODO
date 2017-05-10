import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import './styles.css';
import ToDoCount from '../../components/todocount'
import ClearButton from '../../components/clearbutton'
import ToDoItem from '../../components/todoitem'
import AccountsUIWrapper from '../../components/AccountsUiWrapper/index';
import { ToDos } from '../../../api/todos';

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: ''
    } 

    this.addToDo = this.addToDo.bind(this);

   }

  toggleComplete(todo){
    console.log(todo)
    Meteor.call('todos.toggleComplete', todo)
  }

  removeToDo(todo){
    Meteor.call('todos.removeToDo', todo)
  }

  removeCompleted(){
    let todoIds = this.props.todos.filter(todo => todo.complete).map(todo => todo._id);
    console.log(todoIds);
    Meteor.call('todos.removeCompleted', todoIds)
  }

  hasCompleted(){
    let newTodos = this.props.todos.filter((todo) => (todo.complete));
    if(newTodos.length > 0 ){
      return true;
    } else {
      return false;
    }
  }

  addToDo(event){
    event.preventDefault();

    if( this.state.inputValue ){
       
       Meteor.call('todos.addToDo', this.state.inputValue)

       this.setState({
         inputValue: ''
       })
    }
  }

  componentDidMount(){
    // this.state.input.focus();
  }

  onInputChange(event){
    this.setState({
      inputValue : event.target.value
    })
  }

  render() {

    const todos = this.props.todos;

    const userToDos = this.props.todos.filter(todo => todo.owner === this.props.currentUserId)

    return (
      <div className='app-wrapper'>
        <div className='login-wrapper'>
          <AccountsUIWrapper />
        </div>
        <div className="todo-list">

        <h1>ToDo</h1>
        { this.props.currentUser &&
        <div>
          <div className="add-todo">
            <form name="addTodo" onSubmit={this.addToDo}>
                <input type="text" onChange={(e) => this.onInputChange(e)} value={this.state.inputValue}/>
                <span>(press enter to add)</span>
            </form>
          </div>

            <ul>
              {
                userToDos.map((todo, i) => (
                  <ToDoItem  
                    item={todo} 
                    key={i} 
                    toggleComplete={() => this.toggleComplete(todo)}
                    removeTodo={() => this.removeToDo(todo)}
                  />
                ))
              }
            </ul>

            <div className='todo-admin'> 
              <ToDoCount numb={userToDos.length} />
              { this.hasCompleted() && 
                <ClearButton removeCompleted={() => this.removeCompleted()} />  
              }
            </div>
          </div>
        }</div>
      </div>
    );
  }
}

App.PropTypes = {
  todos: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string
}

App.defaultProps = {
  todos: []
}


export default createContainer(() => {
  Meteor.subscribe('todos');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    todos: ToDos.find({}).fetch()
  };
}, App);

