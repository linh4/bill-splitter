import React from 'react'
import {connect} from 'react-redux'
import {handleLogin} from '../actions/index.js'

class Login extends React.Component{
  state={
    error: false,
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleLogin(this.state)
  }
  render(){
    if (this.state.error){
      alert("Invalid Login Information")
      this.props.history.push('/');
      return null
    }else{
      return(
          <form>
            <label>Username</label>
            <input placeholder='Username' name="username" onChange={this.handleChange}/>
            <label>Password</label>
            <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
          <button onClick={this.handleSubmit} type='submit'>Submit</button>
          </form>
      )
    }
  }
}

export default connect(null, {handleLogin})(Login)
