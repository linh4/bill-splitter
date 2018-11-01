import API_KEY from '../keys.js'
import moment from 'moment';

let m = moment().format("DD/MM/YYYY");
console.log(m)

export function handleSignUp(values) {
  return dispatch => {
    fetch("http://localhost:3000/users", {
       method: 'POST',
       body: JSON.stringify(values),
       headers: {"Content-Type": "application/json"}
     })
     .then(res => res.json())
     .then(res => {
       console.log(res)
       dispatch({type: "UPDATE_USER", payload: res.user})
      })
  }
}

export function handleLogin(values) {
  return dispatch => {
    fetch("http://localhost:3000/auth", {
       method: 'POST',
       body: JSON.stringify(values),
       headers: {"Content-Type": "application/json"}
     })
     .then(res => res.json())
     .then(res => {
       // debugger
       console.log(res)
       dispatch({type: "UPDATE_USER", payload: res.user})
      })
  }
}


export function convertImg(imageSrc) {
  let img = imageSrc.replace("data:image/jpeg;base64,", "")
  return dispatch => {
    dispatch({type: "ADD_IMG", payload: imageSrc})
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

      dispatch({type: 'RENDER_TEXT', payload: billList()})
    })
  }
 }

 export function createBill(values) {
   return dispatch => {
   fetch("http://localhost:3000/bills", {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
        Authorization: localStorage.getItem("token")
      }
    }).then(res => res.json()).then(res => {
        dispatch({ type: "ADD_BILL", payload: res.data.attributes })
      }
    )
  }

 }
