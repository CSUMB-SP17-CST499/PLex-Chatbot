import React from 'react'
import { Router, Route } from 'react-router'

// Import App component
import App from './components/App'

// Route the root path to App component
const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
  </Router>
);

export default Routes;