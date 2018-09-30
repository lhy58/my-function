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