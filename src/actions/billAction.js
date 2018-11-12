import API_KEY from '../keys.js'
import helperFunction from './helperFunction'
import moment from 'moment';

let today = moment().format("DD/MM/YYYY");
let head = {
  "Content-Type": "application/json",
  'Accept': 'application/json',
  Authorization: localStorage.getItem("token")
 }

const renderBill = (bill) => {
  return {type: 'GET_BILL', payload: bill}
}

export const itemArr = (arr) => {
  return {type: 'GET_ITEMS', payload: arr}
}

export const clearItems = () => {
  return {type: 'RESET_ITEMS'}
}

export const clearBill = () => {
  return {type: 'RESET_BILL'}
}

const addTax = (tax) => {
  return {type: 'ADD_TAX', payload: tax}
}

const addTip = (tip) => {
  return {type: 'ADD_TIP', payload: tip}
}

const renderBills = (bills) => {
  return {type: 'RENDER_BILLS', payload: bills}
}

const addname = (name) => {
  return {type: 'ADD_NAME', payload: name}
}

const removeBill = (billId) => {
  return {type: 'DELETE_BILL', payload: billId}
}

export const createBill = (userId) => {
  return dispatch => {
    return fetch("http://localhost:3000/bills", {
      method: 'POST',
      headers: head,
      body: JSON.stringify({
        user_id: userId,
        date: today
      })
     })
     .then(res => res.json())
 }
}

export const getBill = (billId) => {
  return dispatch => {
    return fetch(`http://localhost:3000/bills/${billId}`, {
      headers: head
    }).then(res => res.json()).then(res => dispatch(renderBill(res)))
  }
}

export const createItems = (billId,imageSrc) => {
  let img = imageSrc.replace("data:image/jpeg;base64,", "")
  let bodyImg = {
    "requests": [
      {
        "image": {
          "content": img,
        },
        "features": [
          {
            "type": "TEXT_DETECTION",
            "maxResults": 1
          }
        ]
      }
    ]
  }
  return dispatch => {
    return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY.API_KEY}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(bodyImg)
    })
    .then(res => res.json())
    .then(data => helperFunction(data))
    .then(res => dispatch(itemArr(res)))
   }
}

 export const fetchBill = (billId) => {
   return dispatch => {
     return fetch(`http://localhost:3000/bills/${billId}`, {
       headers: head
     })
     .then(res => res.json())
     .then(res => {
       if (res.error) {
         throw new Error ('log in error')
       } else {
         dispatch(itemArr(res))
       }
     })
   }
 }

 export const postTax = (billId, date, tax) => {
   return dispatch => {
     return fetch(`http://localhost:3000/bills/${billId}`, {
       method: 'PATCH',
       headers: head,
       body: JSON.stringify({
         date: date,
         tax: tax
       })
     })
     .then(res => res.json())
     .then(res => dispatch(addTax(res.tax)))
   }
 }

 export const postTip = (billId, date, tax, tip) => {
   return dispatch => {
     return fetch(`http://localhost:3000/bills/${billId}`, {
       method: 'PATCH',
       headers: head,
       body: JSON.stringify({
         date: date,
         tax: tax,
         tip: tip
       })
     })
      .then(res => res.json())
      .then(data => dispatch(addTip(data.tip)))
   }
 }

 export const getAllBills = () => {
   return dispatch => {
     return fetch("http://localhost:3000/bills", {
       headers: head
     })
     .then(res => res.json())
     .then(data => dispatch(renderBills(data)))
   }
 }

 export const changeName = (billId, name) => {
   return dispatch => {
     return fetch(`http://localhost:3000/bills/${billId}`, {
       method: 'PATCH',
       headers: head,
       body: JSON.stringify({
         date: name
       })
     })
     .then(res => res.json())
     .then(data => dispatch(addname(data.date)))
   }
 }

 export const deleteBill = (billId) => {
   return dispatch => {
     return fetch(`http://localhost:3000/bills/${billId}`, {
       method: 'DELETE',
       headers: head
     })
     .then(res => res.text())
     .then(data => dispatch(removeBill(billId)))
   }
 }
