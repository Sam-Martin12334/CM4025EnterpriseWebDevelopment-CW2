import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import PrivateRoute from './auth/PrivateRoute'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import UserAdmin from './user/UsersAdmin'
import Comments from './user/Comments' //Route for comment.js
import CommentsAdmin from './user/CommentsAdmin' //Route for CommentAdmin.js
import Events from './user/Events' //Route for Events.js
import EventsAdmin from './user/EventsAdmin' //Route for EventsAdmin.js

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/comments/:userId" component={Comments}/>
        <Route path="/commentsadmin/:userId" component={CommentsAdmin}/>
        <Route path="/event/:userId" component={Events}/>
        <Route path="/eventadmin/:userId" component={EventsAdmin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/useradmin/:userId" component={UserAdmin}/>
      </Switch>
    </div>)
}

export default MainRouter
