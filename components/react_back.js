/**
 * Created by lihanying on 2018/7/31.
 */
//react-router 导航回退键 ,使用React.cloneElement克隆子页面时

import React, {Component} from 'react';
export default class extends Component{
    constructor(props){
        super(props);
    }

    handleHasHash=(text)=>{
        history.replaceState('hasHash', '', '');
    };

    render(){
        if(window.history && window.history.pushState){
            //监听手机回退键
            window.addEventListener('popstate', function(e) {
                if(e.state) {
                    window.history.pushState('forward', null, '#/profile');
                }
            },false);
        }
        return(
            <div>
                <div className="weui_tab">
                    <div className="team_navbar">
                        <NavLinks to="/match/oneList/" onClick={()=>this.handleHasHash('首页')}>
                            <p className="team_navbar_label">首页</p>
                        </NavLinks>
                        <NavLinks to="/match/popularList" onClick={()=>this.handleHasHash('视频')}>
                            <p className="team_navbar_label">视频</p>
                        </NavLinks>
                        <NavLinks to="/match/notice" onClick={()=>this.handleHasHash('资料')}>
                            <p className="team_navbar_label">资料</p>
                        </NavLinks>
                        <NavLinks to="/match/myInfo" onClick={()=>this.handleHasHash('我的')}>
                            <p className="team_navbar_label">我的</p>
                        </NavLinks>
                        <div className="nav_slider team_slider"></div>
                    </div>
                    <div className="team_content">
                        {React.cloneElement(this.props.children, {
                            ...this.state,
                        })}
                    </div>
                </div>
            </div>
        )
    }
}