import React from 'react'
import '../../style/Form.css'
import {connect} from 'react-redux'
import {handleSignUp} from '../../actions/userAction.js'
import { withRouter } from 'react-router-dom'

class SignUp extends React.Component{
  state = {
    name: "",
    username: "",
    password: "",
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault()
    this.props.handleSignUp(this.state)
    .then(() => this.props.history.push('/login'))
    .catch(() => this.props.history.push('/signup'))
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleFocus = (e) => {
    e.persist()
    setTimeout(function() {
      e.target.parentElement.lastElementChild.style.opacity = '0'
    }, 100)
  }

  handleBlur = (e) => {
    e.persist()
    setTimeout(function() {
      e.target.parentElement.lastElementChild.style.opacity = '1'
    }, 300)
  }

  handleSignup = () => {
    this.props.history.push('/login')
  }

  render(){
    return(
      <React.Fragment>
        <form className="login-signup" onFocus={this.handleFocus} onBlur={this.handleBlur} >
          <legend className="legend">SIGNUP</legend>
          <div className="input">
          <input placeholder='Name' name="name" onChange={this.handleChange}/>
          <span><i className="fas fa-address-card"></i></span>
        </div>
        <div className="input">
          <input placeholder='Username' name="username" required onChange={this.handleChange}/>
          <span><i className="fas fa-user"></i></span>
        </div>
        <div className="input">
          <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
          <span><i className="fa fa-lock"></i></span>
        </div>
          <button className="submit btn" onClick={this.handleSignUpSubmit} type='submit'>SUBMIT</button>
          <button className="signup btn" onClick={this.handleSignup}>LOGIN</button>
        </form>
      </React.Fragment>
    )
  }
}

export default withRouter(connect(null, {handleSignUp})(SignUp))
