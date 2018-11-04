const getEditItem = (item) => {
  return {type: 'EDIT_ITEM', payload: item}
}

const getDeleteItem = (itemId) => {
  return {type: 'DELETE_ITEM', payload: itemId}
}

let head = {
  "Content-Type": "application/json",
  'Accept': 'application/json',
  Authorization: localStorage.getItem("token")
 }

export const editItem = (itemId, item) => {
  return dispatch => {
    return fetch(`http://localhost:3000/items/${itemId}`, {
      method: 'PATCH',
      headers: head,
      body: JSON.stringify({
        title: item.title,
        price: item.price
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
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
