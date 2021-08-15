import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// CSS Import
import './index.css';

// Components Import
import Login from './components/Login';
import Chat from './components/Chat';
import AuthProvider from './context/AuthContext';

const Website = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/chat' component={Chat}/>
          <Route path='/' component={Login}/>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

ReactDOM.render(<Website />, document.getElementById('root'))