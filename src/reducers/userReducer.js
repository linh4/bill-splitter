const initialState = {
  currentUser: {},
  loggedIn: false,
  loading: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_USER':
      localStorage.setItem("token", action.payload.jwt)
      return {...state, currentUser: action.payload.user, loggedIn: true}
    case 'LOGIN_USER':
      localStorage.setItem("token", action.payload.jwt)
      return {...state, currentUser: action.payload.user, loggedIn: true, loading: false}
    case 'LOGOUT_USER':
      localStorage.removeItem('token')
      return {...state, currentUser: {}}
    case 'CURRENT_USER':
      return {...state, currentUser: action.payload}

    default:
      return state;
  }
}

export default userReducer
