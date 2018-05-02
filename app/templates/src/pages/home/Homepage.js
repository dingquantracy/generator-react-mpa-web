import React from 'react'
import userSvc from '../../common/services/UserSvc'

export default class Homepage extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      title: props.title
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState)=>{
    console.log(nextProps)
    if(nextProps.title){
      return { title: nextProps.title }
    }

    // return false
    console.log(prevState)
    return prevState
  }

  componentDidMount() {
    console.log(this.state)
    console.log('componentDidMount@@@@@')
    userSvc.getUserInfo()
  }

  click(){
    alert('click')
  }

  render(){
    const { title } = this.state

    return (
      <div>
        <h2 onClick={this.click.bind(this)}>这是固定文案！！00000</h2><br/>
        <h3 onClick={this.click.bind(this)}>{title}</h3>
        <div className="img"></div>
        <div className="img2"></div>
        <div className="img2">9999</div>
      </div>
    )
  }
}