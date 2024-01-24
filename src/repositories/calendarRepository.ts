import Repository from './Version1Repository'
import { useAuth } from '../services/AuthContext'
const getAppointment = '/GetAppointments'
const businessID = useAuth().user!.BusinessModel[0].BusinessID

export default {
  getAppointment(payload: any) {
    return Repository.post(`${getAppointment}`, {
      business_id: businessID,
      date: payload,
    })
  },
}
