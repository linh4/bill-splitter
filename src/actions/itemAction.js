const getEditItem = (item) => {
  return {type: 'EDIT_ITEM', payload: item}
}

const getDeleteItem = (itemId) => {
  return {type: 'DELETE_ITEM', payload: itemId}
}

const selectItem = (item) => {
  return {type: "SELECT_ITEM", payload: item}
}

let head = {
  "Content-Type": "application/json",
  'Accept': 'application/json',
  Authorization: localStorage.getItem("token")
}


 export const postItems = (billId, item) => {
   return dispatch => {
     return fetch("https://split-b-api.herokuapp.com/items", {
       method: 'POST',
       headers: head,
       body: JSON.stringify({
         bill_id: billId,
         item: item
       })
     })
     .then(res => res.text())
     .then(data => console.log(data))
   }
 }

export const getItem = (itemId) => {
  return dispatch => {
    return fetch(`https://split-b-api.herokuapp.com/items/${itemId}`, {
      header: head
    })
    .then(res => res.json())
    .then(data => dispatch(selectItem(data)))
  }
}

export const editItem = (item) => {
  return dispatch => {
    return fetch(`https://split-b-api.herokuapp.com/items/${item.id}`, {
      method: 'PATCH',
      headers: head,
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(data => dispatch(getEditItem(data)))
  }
}

export const deleteItem = (itemId) => {
  return dispatch => {
    return fetch(`https://split-b-api.herokuapp.com/items/${itemId}`, {
      method: 'DELETE',
      headers: head
    })
    .then(res => res.text())
    .then(data => dispatch(getDeleteItem(itemId)))
  }
}

export const createItem = (billId, item) => {
  return dispatch => {
    return fetch("https://split-b-api.herokuapp.com/items", {
      method: 'POST',
      headers: head,
      body: JSON.stringify({
        bill_id: billId,
        item: item
      })
    })
    // .then(res => res.text())
    // .then(data => console.log(data))
  }
}
