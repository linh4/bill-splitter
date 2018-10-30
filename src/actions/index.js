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
    .then(data => console.log(data.responses[0].fullTextAnnotation.text))
  }
 }
