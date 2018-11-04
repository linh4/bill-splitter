import API_KEY from '../keys.js'
import helperFunction from './helperFunction'
import moment from 'moment';

let today = moment().format("DD/MM/YYYY");
let head = {
  "Content-Type": "application/json",
  'Accept': 'application/json',
  Authorization: localStorage.getItem("token")
 }

const addBill = (bill) => {
  return {type: 'ADD_BILL', payload: bill}
}

const getItems = (item) => {
  return {type: 'GET_ITEMS', payload: item}
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
     }).then(res => res.json()).then(res => dispatch(addBill(res)))
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
    .then(res => {
      return new Promise(async(resolve, reject) => {
        for (let i = 0; i < res.length; i++) {
          await postItems(billId, res[i]).then(res => res.json())
             .then(data => dispatch(getItems(data)))
        }
      })
    })
   }
}

 export const postItems = (billId, item) => {
     return fetch("http://localhost:3000/items", {
       method: 'POST',
       headers: head,
       body: JSON.stringify({
         bill_id: billId,
         title: item.title,
         price: item.price
       })
     })
     // .then(response => {
     //         if(response.ok) return response.json();
     //         throw new Error(response.statusText);
     //       })

 }

 export const fetchBill = (billId) => {
   // return dispatch => {
     return fetch(`http://localhost:300/bills/${billId}`, {
       headers: head
     })
     .then(res => res.json()).then(res => console.log(res))
   // }
 }
