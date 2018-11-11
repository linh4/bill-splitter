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

 export const postItems = (billId, item) => {
   return dispatch => {
     return fetch("http://localhost:3000/items", {
       method: 'POST',
       headers: head,
       body: JSON.stringify({
         bill_id: billId,
         item: item
       })
     })
     .then(data => dispatch(clearItems()))
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

 export const postTax = (billId, tax) => {
   return dispatch => {
     return fetch(`http://localhost:3000/bills/${billId}`, {
       method: 'PATCH',
       headers: head,
       body: JSON.stringify({tax: tax})
     })
     .then(res => res.json())
     .then(res => {
       if (res.error) {
         throw new Error ('log in error')
       } else {
         dispatch(addTax(res.tax))
       }
     })
   }
 }

 export const postTip = (billId, tip) => {
   return dispatch => {
     return fetch(`http://localhost:3000/bills/${billId}`, {
       method: 'PATCH',
       headers: head,
       body: JSON.stringify({tip: tip})
     })
      .then(res => res.json())
      .then(data => console.log("inside posttip",data))
   }
 }
