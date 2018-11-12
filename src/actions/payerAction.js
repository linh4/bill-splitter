export const addPayer = (payer) => {
  return {type: 'ADD_PAYER', payload: payer}
}

export const getPayer = (payers) => {
  return {type: 'GET_PAYER', payload: payers}
}

const removePayer = (payerId) => {
  return {type: 'DELETE_PAYER', payload: payerId}
}

export const clearPayers = () => {
  return {type: 'CLEAR_PAYERS'}
}

const payerArr = (payers) => {
  return {type: 'FETCH_PAYERS', payload: payers}
}

const selectPayer = (payer) => {
  return {type: 'SELECTED_PAYER', payload: payer}
}

let head = {
  "Content-Type": "application/json",
  'Accept': 'application/json',
  Authorization: localStorage.getItem("token")
 }

export const createPayer = (name) => {
  return dispatch => {
    return fetch("https://split-b-api.herokuapp.com/payers", {
      method: 'POST',
      headers: head,
      body: JSON.stringify(name)
    })
    .then(res => res.json())
    .then(data => dispatch(addPayer(data)))
  }
}

export const deletePayer = (payerId) => {
  return dispatch => {
    return fetch(`https://split-b-api.herokuapp.com/payers/${payerId}`, {
      method: 'DELETE',
      headers: head
    })
    .then(res => res.text())
    .then(data => dispatch(removePayer(payerId)))
  }
}

export const postItemPayer = (itemId, payers) => {
  console.log(itemId, payers)
  return dispatch => {
    return fetch("https://split-b-api.herokuapp.com/item_payers", {
      method: 'POST',
      headers: head,
      body: JSON.stringify({
        item_id: itemId,
        payer_id: payers
      })
    })
    // .then(res => res.json())
    // .then(console.log)
  }
}

export const fetchPayers = () => {
  return dispatch => {
    return fetch("https://split-b-api.herokuapp.com/payers", {
      headers: head
    })
    .then(res => res.json())
    .then(data => dispatch(payerArr(data)))
  }
}

export const getThisPayer = (payerId) => {
  return dispatch => {
    return fetch(`https://split-b-api.herokuapp.com/payers/${payerId}`, {
      headers: head
    })
    .then(res => res.json())
    .then(data => dispatch(selectPayer(data)))
  }
}
