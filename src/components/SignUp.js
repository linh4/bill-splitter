import React from 'react'
import {connect} from 'react-redux'
import {handleSignUp} from '../actions/index.js'

class SignUp extends React.Component{
  state = {
    name: "",
    username: "",
    password: "",
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault()
    this.props.handleSignUp(this.state)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  render(){
    return(
      <form>
        <label>Name</label>
        <input placeholder='Name' name="name" onChange={this.handleChange}/>
        <label>Username</label>
        <input placeholder='Username' name="username" onChange={this.handleChange}/>
        <label>Password</label>
        <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
      <button onClick={this.handleSignUpSubmit} type='submit'>Submit</button>
      </form>
    )
  }
}

export default connect(null, {handleSignUp})(SignUp)
