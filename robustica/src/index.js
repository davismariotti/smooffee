import React from "react"
import {render} from "react-dom"
import {hashHistory, IndexRoute, Route, Router} from "react-router"
import App from "./components/App"
import Home from "./Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Recover from "./components/auth/Recover"
import requireAuth from "./utils/RequireAuth"
import "./css/index.css"
import "bootstrap/dist/css/bootstrap.css"

// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="login" component={Login}/>
            <Route path="signup" component={Signup}/>
            <Route path="recover" component={Recover}/>
            <Route path="home" component={Home} onEnter={requireAuth}/>
        </Route>
    </Router>,
    document.getElementById("root")
)
