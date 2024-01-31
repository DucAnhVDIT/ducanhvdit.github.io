import Repository from './Version1Repository'
import { dataUser } from '../types/user'

const getServicesCategory = '/GetServicesCategory'
const getServices = '/GetServices'
const searchServices = '/SearchService'
const getStaff = '/GetStaff'
const businessID = '20160908110055249272'
const businessIDTest = !dataUser ? '' : dataUser.BusinessModel[0].BusinessID

export default {
  getServicesCategory() {
    return Repository.post(`${getServicesCategory}`, {
      business_id: businessID,
    })
  },

  getServices(StaffID: any, catId: any) {
    return Repository.post(`${getServices}`, {
      business_id: businessID,
      StaffID: StaffID,
      CategoryID: catId,
    })
  },

  searchServices(code: string, name: string) {
    return Repository.post(`${searchServices}`, {
      business_id: businessID,
      serviceCode: code,
      servicename: name,
    })
  },

  getStaff() {
    return Repository.post(`${getStaff}`, {
      business_id: businessID,
      date: Math.floor(Date.now() / 1000),
    })
  },
}
