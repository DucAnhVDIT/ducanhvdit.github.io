import Repository from './Version1Repository'
import { useAuth } from '../services/AuthContext'
import { dataUser } from '../types/user'

const getAppointment = '/GetAppointments'
const addNew = '/AddNewAppointment'
const fakeID = '20160908110055249272'
const businessID = !dataUser ? '' : dataUser.BusinessModel[0].BusinessID

export default {
  getAppointment(payload: any) {
    return Repository.post(`${getAppointment}`, {
      business_id: businessID,
      date: payload,
    })
  },

  addAppointment(payload: any) {
    return Repository.post(`${addNew}`, payload)
  },
}
