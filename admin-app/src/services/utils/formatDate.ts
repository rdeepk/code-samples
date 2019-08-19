import moment from 'moment'

const dateHelper = {

  formatDate(dateStr: string, formatStr = 'DD/MM/YYYY') {
    return moment(dateStr).format(formatStr)
  },

  removeTimezone(dateTime: object) {
    const dateTimeMoment = moment(dateTime)
    return moment(dateTimeMoment).utc().add(dateTimeMoment.utcOffset(), 'm')
  }

}

export default dateHelper
