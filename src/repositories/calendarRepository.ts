import Repository from './Version1Repository'
import { useAuth } from '../services/AuthContext'
const getAppointment = '/GetAppointments'
const addNew = '/AddNewAppointment'
const fakeID = '20160908110055249272'
const businessID = useAuth().user!.BusinessModel[0].BusinessID

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
