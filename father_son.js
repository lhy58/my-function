/**
 * react父组件调用子组件定义的方法
 * 
 * **/
import React from 'react'

export default class Father extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      onSonfunc: () => {},
    }
  }
  _onSonChange = (func, key) => {
    this.setState({onSonfunc: func})
  }

  handleFather = () => {
    // 可以执行子组件里的onclick方法了
    this.state.onSonfunc()
  }
  render(){
    return(
      <view>
        <text onClick={this.handleFather}>我是父组件</text>
        <Son onSonChange={this._onSonChange}/>
      </view>
    )
  }
}

export class Son extends React.PureComponent{
  componentDidMount(){
    this.props.onSonChange(this.onclick, 'onSonfunc')
  }
  onclick = () => {
    console.log('我是子组件...')
  }
  render(){
    return (
      <view>
        我是子组件
      </view>
    )
  }
}