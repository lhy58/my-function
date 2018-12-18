// 路由跳转问题

import React from 'react'
import {withRouter} from 'react-router-dom'

class extends React.Component{

   componentWillMount(){
       // 自定跳转,不刷新浏览器
       this.props.history.push('/home')

       // 刷新浏览器
       window.location.href = '/home'
   }
   render(){
       return(
           <div>自定义跳转界面...</div>
       )
   }
}

export default withRouter(a)


// 路由配置
// app.js文件
import React, { Component } from 'react';
import  {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import routers from './routers'

const RouteWithSubRoutes = (route) => {
    return <Route path={route.path} render={props => (
        <route.component {...props} routes={route.routes} user={route.user}/>
    )}/>
}

class App extends Component {
    render() {
        return (
            <Router basename='/'>
                <Switch>
                    {routers.map((route,index) => {
                        return <RouteWithSubRoutes key={index} {...route}/>
                    })}
                </Switch>
            </Router>
        );
    }
}

export default App;

// routers.js文件
import Home from './home'
import A from './a'
import B from './b'

const routers = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/a',
        exact: true,
        component: A
    },
    {
        path: '/b',
        exact: true,
        component: B
    },
]

export default routers