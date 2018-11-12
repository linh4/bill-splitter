export const convertNum = (num) => {
  switch (num) {
    case '1.00':
      return '1'
    case '0.50':
      return '1/2'
    // case 0.33375:
      // return '1/3'
    case '0.33':
      return '1/3'
    case '0.34':
      return '1/3'
    case '0.25':
      return '1/4'
    case '0.20':
      return '1/5'
    default:
      return '0'
  }
}
