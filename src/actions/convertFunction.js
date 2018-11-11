export const convertNum = (num) => {
  switch (num) {
    case 1:
      return '1'
    case 0.5:
      return '1/2'
    case 0.33375:
      return '1/3'
    case 0.25:
      return '1/4'
    case 0.2:
      return '1/5'  
    default:
      return '0'
  }
}
