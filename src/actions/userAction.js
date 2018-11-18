const loginUser = (user) => {
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
    return fetch("https://split-b-api.herokuapp.com/users", {
       method: 'POST',
       body: JSON.stringify(values),
       headers: {
         "Content-Type": "application/json",
         'Accept': 'application/json'
       }
     })
     .then(res => res.json())
     .then(user => {
       if (user.error) {
         alert('Wrong Information')
         throw new Error ('log in error')
       } else {
         return dispatch(signupUser(user))
     } //payload has user obj and jwt
   })
 }
}

export function handleLogin(values) {
  return dispatch => {
    return fetch("https://split-b-api.herokuapp.com/auth", {
       method: 'POST',
       body: JSON.stringify(values),
       headers: {"Content-Type": "application/json"}
     })
     .then(res => res.json())
     .then(user => {
       if (!user.jwt) {
         alert('Wrong Information')
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
    return fetch('https://split-b-api.herokuapp.com/current_user', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => {if(res.ok) return res.json()
              alert('please log in')})
      .then(user => dispatch(getCurrentUser(user)))
  };
}
