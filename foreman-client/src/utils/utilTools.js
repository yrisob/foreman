class UtilTools {
  getMilesecondsNow () {
    return (new Date()).getTime()
  }

  isExpired (data) {
    return this.getMilesecondsNow() >= data
  }
}

const utilTools = new UtilTools()
export default utilTools
