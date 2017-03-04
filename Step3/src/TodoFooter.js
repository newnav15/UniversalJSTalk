import React from 'react';
import {pluralize} from './utils';
import constants from './constants';
import classNames from 'classnames';
import {Link} from 'react-router';

const TodoFooter = React.createClass({
	render: function () {
		var activeTodoWord = pluralize(this.props.count, 'item');
		var clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button
					className="clear-completed"
					onClick={this.props.onClearCompleted}>
					Clear completed
				</button>
			);
		}

		var nowShowing = this.props.nowShowing;
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.count}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					<li>
						<Link to={'/show/' + constants.ALL_TODOS} className={classNames({selected: nowShowing === constants.ALL_TODOS})}>All</Link>
					</li>
					{' '}
					<li>
						<Link to={'/show/' + constants.ACTIVE_TODOS} 
							className={classNames({selected: nowShowing === constants.ACTIVE_TODOS})}>Active</Link>
					</li>
					{' '}
					<li>
						<Link to={'/show/' + constants.COMPLETED_TODOS}
							className={classNames({selected: nowShowing === constants.COMPLETED_TODOS})}>Completed</Link>
					</li>
				</ul>
				{clearButton}
			</footer>
		);
	}
});

export default TodoFooter;
