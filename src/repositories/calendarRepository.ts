import Repository from './Version1Repository'

const getAppointment = '/GetAppointments'
const addNew = '/AddNewAppointment'
const fakeID = '20160908110055249272'

export default {
  getAppointment(payload: any) {
    return Repository.post(`${getAppointment}`, { business_id: fakeID, date: payload })
  },

  addAppointment(payload: any) {
    return Repository.post(`${addNew}`, payload)
  },
}
