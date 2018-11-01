import API_KEY from '../keys.js'

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
      let price = p.map(pr => pr.replace('$', ''))
      console.log(price)
      // let result = price.map(p => p.replace(/\n|\s*/gi, ''))
      // let abc = result.filter(r => r.match(/^\d+/))

      let items = split.filter(item => !p.includes(item) && !item.includes('TOTAL') && !item.includes('WWW. CUSTONRECEIPT.CON'))
      items.splice(-1, 0, 'TOTAL')
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
