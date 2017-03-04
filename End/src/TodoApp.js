import React from 'react';
import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem';
import constants from './constants';

import TodoModel from './todoModel';

const TodoApp = React.createClass({
    getInitialState: function () {
        return {
            nowShowing: constants.ALL_TODOS,
            editing: null,
            newTodo: ''
        };
    },

    getDefaultProps: function(){
        var model = new TodoModel('react-todos');
        return {
            model: model
        }
    },

    setShowing: function(nextProps){
        var show = nextProps.params.show;
        
        if(show === constants.COMPLETED_TODOS){
            this.setState({nowShowing: constants.COMPLETED_TODOS});
        } else if (show === constants.ACTIVE_TODOS){
            this.setState({nowShowing: constants.ACTIVE_TODOS});
        } else {
            this.setState({nowShowing: constants.ALL_TODOS});
        }
    },

    componentDidMount: function () {
        this.setShowing(this.props);
    },
    componentWillReceiveProps: function(nextProps){
        this.setShowing(nextProps);
    },

    handleChange: function (event) {
        this.setState({newTodo: event.target.value});
    },

    handleNewTodoKeyDown: function (event) {
        if (event.keyCode !== constants.ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var val = this.state.newTodo.trim();

        if (val) {
            this.props.model.addTodo(val);
            this.setState({newTodo: ''});
        }
    },

    toggleAll: function (event) {
        var checked = event.target.checked;
        this.props.model.toggleAll(checked);
        this.forceUpdate();
    },

    toggle: function (todoToToggle) {
        this.props.model.toggle(todoToToggle);
        this.forceUpdate();
    },

    destroy: function (todo) {
        this.props.model.destroy(todo);
        this.forceUpdate();
    },

    edit: function (todo) {
        this.setState({editing: todo.id});
    },

    save: function (todoToSave, text) {
        this.props.model.save(todoToSave, text);
        this.setState({editing: null});
    },

    cancel: function () {
        this.setState({editing: null});
    },

    clearCompleted: function () {
        this.props.model.clearCompleted();
        this.forceUpdate();
    },

    render: function () {
        var footer;
        var main;
        var todos = this.props.model.todos;

        var shownTodos = todos.filter(function (todo) {
            switch (this.state.nowShowing) {
            case constants.ACTIVE_TODOS:
                return !todo.completed;
            case constants.COMPLETED_TODOS:
                return todo.completed;
            default:
                return true;
            }
        }, this);

        var todoItems = shownTodos.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onSave={this.save.bind(this, todo)}
                    onCancel={this.cancel}
                />
            );
        }, this);

        var activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);

        var completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer =
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={this.clearCompleted}
                />;
        }

        if (todos.length) {
            main = (
                <section className="main">
                    <input
                        className="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown}
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
});

export default TodoApp;
