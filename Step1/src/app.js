import React from 'react';
import ReactDom from 'react-dom';

import TodoApp from './TodoApp';
import TodoModel from './todoModel';

var model = new TodoModel('react-todos');

function render() {
	ReactDom.render(
		<TodoApp model={model}/>,
		document.getElementsByClassName('todoapp')[0]
	);
}

model.subscribe(render);
render();

