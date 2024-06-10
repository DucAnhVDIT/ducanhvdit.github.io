import Repository from './Version1Repository'
import { useAuth } from '../services/AuthContext'
import { dataUser } from '../types/user'

const getAppointment = '/GetAppointments'
const getSingleAppointment = '/GetAppointment'
const addNew = '/AddNewAppointment'
const updateAppointment = '/UpdateAppointment'
const getStaff = '/GetStaff'
const GetBusinessHours = '/GetBusinessHours'
const fakeID = '20160908110055249272'
// const fakeID = '20211105170531516337'
// const businessID = !dataUser ? '' : dataUser.BusinessModel[0].BusinessID

export default {
  getAppointment(payload: any) {
    return Repository.post(`${getAppointment}`, {
      business_id: fakeID,
      date: payload,
    })
  },

  getSingleAppointment(payload: any) {
    return Repository.post(`${getSingleAppointment}`, {
      business_id: fakeID,
      id: payload,
    })
  },

  addAppointment(payload: any) {
    return Repository.post(`${addNew}`, { ...payload, business_id: fakeID })
  },

  updateAppointment(payload: any) {
    return Repository.post(`${updateAppointment}`, { ...payload, business_id: fakeID })
  },

  getStaff(payload: any) {
    return Repository.post(`${getStaff}`, {
      business_id: fakeID,
      date: payload,
    })
  },

  GetBusinessHours(payload: any) {
    return Repository.post(`${GetBusinessHours}`, {
      business_id: fakeID,
      date: payload,
    })
  },

}
