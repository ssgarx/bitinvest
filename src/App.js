import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <>
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/login' component={Login} exact />
                    <Route path='/register' component={Register} exact />
                    <Route path='/dashboard' component={Dashboard} exact />
                </Switch>
            </>
        </Router>
    )
}

export default App
