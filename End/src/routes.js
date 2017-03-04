// src/routes.js
import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import TodoApp from './TodoApp';
import constants from './constants';

const AppLayout = React.createClass({
    render: function() {
        return (
            <div className="layout">
                {this.props.children}
            </div>
        )
    }
});

const routes = (
  <Route path="/" component={AppLayout}>
    <IndexRedirect to="/show/all" />
    <Route path="/show/:show" component={TodoApp} />
  </Route>
);

export default routes;