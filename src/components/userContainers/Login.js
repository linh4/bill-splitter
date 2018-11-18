import React from 'react'
import '../../style/Form.css'
import {connect} from 'react-redux'
import {handleLogin} from '../../actions/userAction.js'
import { withRouter } from 'react-router-dom'


class Login extends React.Component{
  state={
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleLogin(this.state)
    .then(() => this.props.history.push('/home'))
    .catch(() => this.props.history.push('/'))
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
    this.props.history.push('/signup')
  }

  render(){
      return(
        <div>
          <form className="login-signup" onFocus={this.handleFocus} onBlur={this.handleBlur} >
            <legend className="legend">Login</legend>
            <div className="input">
              <input placeholder='Username' name="username" onChange={this.handleChange} />
              <span><i className="fas fa-user"></i></span>
            </div>
            <div className="input">
              <input type="password" placeholder='Password' name="password" onChange={this.handleChange} />
              <span><i className="fa fa-lock"></i></span>
            </div>
            <button className="submit btn login-form" onClick={this.handleSubmit} type='submit'>SUBMIT</button>
            <button className="signup btn login-form" onClick={this.handleSignup}>SIGNUP</button>
          </form>
        </div>
      )
  }
}

const mapStateToProps= (state) => {

  return {
    currentUser: state.user.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {handleLogin})(Login))
