const addPayer = (payer) => {
  return {type: 'ADD_PAYER', payload: payer}
}

const getPayer = (payers) => {
  return {type: 'GET_PAYER', payload: payers}
}

let head = {
  "Content-Type": "application/json",
  'Accept': 'application/json',
  Authorization: localStorage.getItem("token")
 }

export const createPayer = (name) => {
  return dispatch => {
    return fetch("http://localhost:3000/payers", {
      method: 'POST',
      headers: head,
      body: JSON.stringify({name: name})
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
}

export const fetchPayer = () => {
  return dispatch => {
    return fetch("http://localhost:3000/payers", {
      headers: head
    })
    .then(res => res.json())
    .then(data => dispatch(getPayer(data)))
  }
}
