const filterTimes = (val, format = 'YYYY-MM-DD') => {
  if (!isNull(val)) {
    const originalTime = new Date(val)
    const year = originalTime.getFullYear()
    const month = originalTime.getMonth() + 1
    const day = originalTime.getDate()
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return formattedDate
  } else {
    return '--'
  }
}

export const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date) === '{}') return true
  if (JSON.stringify(date) === '[]') return true
}

export default (app) => {
  app.config.globalProperties.$filters = {
    filterTimes
  }
}
