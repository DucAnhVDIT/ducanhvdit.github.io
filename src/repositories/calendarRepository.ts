import Repository from './Version1Repository'
import { useAuth } from '../services/AuthContext'
import { dataUser } from '../types/user'

const getAppointment = '/GetAppointments'
const addNew = '/AddNewAppointment'
const updateAppointment = '/UpdateAppointment'
const getStaff = '/GetStaff'
const fakeID = '20160908110055249272'
const businessID = !dataUser ? '' : dataUser.BusinessModel[0].BusinessID

export default {
  getAppointment(payload: any) {
    return Repository.post(`${getAppointment}`, {
      business_id: fakeID,
      date: payload,
    })
  },

  addAppointment(payload: any) {
    return Repository.post(`${addNew}`, payload)
  },

  updateAppointment(payload: any) {
    return Repository.post(`${updateAppointment}`, payload)
  },

  getStaff(payload: any) {
    return Repository.post(`${getStaff}`, {
      business_id: fakeID,
      date: payload,
    })
  },
}
