const loginUser = (user) => {
  console.log("in login action", user)
  return {type: 'LOGIN_USER', payload: user}
}

const signupUser = (user) => {
  return {type: 'SIGNUP_USER', payload: user}
}

const getCurrentUser = (user) => {
  return {type: 'CURRENT_USER', payload: user}
}

export function handleSignUp(values) {
  return dispatch => {
    return fetch("http://localhost:3000/users", {
       method: 'POST',
       body: JSON.stringify(values),
       headers: {"Content-Type": "application/json"}
     })
     .then(res => res.json())
     .then(user => {
       if (user.error) {
         console.log(user.error)
         throw new Error ('log in error')
       } else {
         return dispatch(signupUser(user))
     } //payload has user obj and jwt
   })
 }
}

export function handleLogin(values) {
  return dispatch => {
    return fetch("http://localhost:3000/auth", {
       method: 'POST',
       body: JSON.stringify(values),
       headers: {"Content-Type": "application/json"}
     })
     .then(res => res.json())
     .then(user => {
       if (!user.jwt) {
         console.log('erroer')
         throw new Error ('log in error')
       } else {
       return dispatch(loginUser(user)) //payload has user obj and jwt
     }
   })
 }
}

export const logoutUser = () => {
  return dispatch => dispatch({ type: 'LOGOUT_USER' })
}

export const currentUser = (token) => {
  return (dispatch) => {
    fetch('http://localhost:3000/current_user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(user => dispatch(getCurrentUser(user)))
  };
}
