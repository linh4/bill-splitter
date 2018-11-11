import React from 'react'
import {connect} from 'react-redux'
import {handleLogin} from '../../actions/userAction.js'
import { Link, withRouter } from 'react-router-dom'


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
    .then(() => this.props.history.push('/home'))
    .catch(() => this.props.history.push('/'))
    console.log("in submit", this.props.currentUser)
  }

  render(){
      return(
        <div>
          <form>
            <label>Username</label>
            <input placeholder='Username' name="username" onChange={this.handleChange}/>
            <label>Password</label>
            <input type="password" placeholder='Password' name="password" onChange={this.handleChange}/>
            <button onClick={this.handleSubmit} type='submit'>Submit</button>
          </form>
          <Link to="/signup">SIGN UP</Link>
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
