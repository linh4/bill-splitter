const helperFunction = (data) => {
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
  let array = billList()
  return array.map(b => ({title: b[0], price: Number(b[1])}))
}
export default helperFunction
