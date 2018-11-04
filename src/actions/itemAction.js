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

export const getItem = (itemId) => {
  return dispatch => {
    return fetch(`http://localhost:3000/items/${itemId}`, {
      header: head
    })
    .then(res => res.json())
    .then(data => dispatch(selectItem(data)))
  }
}

export const editItem = (item) => {
  return dispatch => {
    return fetch(`http://localhost:3000/items/${item.id}`, {
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
    return fetch(`http://localhost:3000/items/${itemId}`, {
      method: 'DELETE',
      headers: head
    })
    .then(res => res.text())
    .then(data => dispatch(getDeleteItem(itemId)))
  }
}
