import API_KEY from '../keys.js'
import moment from 'moment';

let today = moment().format("DD/MM/YYYY");

const addBill = (bill) => {
  return {type: 'ADD_BILL', payload: bill}
}

const getBill = (bill) => {
  return {type: 'RENDER_TEXT', payload: bill}
}

export const createBill = (userId) => {
  return dispatch => {
    return fetch("http://localhost:3000/bills", {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        date: today
       }),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        Authorization: localStorage.getItem("token")
       }
     }).then(res => res.json()).then(res => dispatch(addBill(res))
   )
 }
}

export const convertImg = (imageSrc) => {
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
    // dispatch({type: "ADD_IMG", payload: imageSrc})
    return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY.API_KEY}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(bodyImg)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      let text = data.responses[0].fullTextAnnotation.text
      let split = text.split('\n')
      // let price = text.match(/(\W|S)?\d+\s*(\.|\,)?\s*\d\d\s*$/mg);
      let p = split.filter(s => s.startsWith('$') || s.match(/^\d+/))
      let price = p.map(pr => pr.replace(/[$\s]/g, ''))
      // let result = price.map(p => p.replace(/\n|\s*/gi, ''))
      // let abc = result.filter(r => r.match(/^\d+/))

      let items = split.filter(item => !p.includes(item) && !item.includes('TOTAL') && !item.includes('WWW. CUSTONRECEIPT.CON'))
      // items.splice(-1, 0, 'TOTAL')
      price.pop()
      items.pop()
      const billList = () => {
      let newArr = []
        for (let i in items) {
          let arr = []
          arr.push(items[i], price[i])
          newArr.push(arr)
        }
        return newArr
      }
      return dispatch(getBill(billList()))
    })
  }
 }
