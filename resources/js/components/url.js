import React from 'react'
import { Route, Switch } from "react-router-dom";
import Chat from './chat'
import User from './user'

function url() {
    return (
        <Switch>
            <Route exact path='/home' component={User} />
            <Route exact path='/chat/:id' component={Chat} />
        </Switch>
    )
}

export default url
