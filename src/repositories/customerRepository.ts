import Repository from './Version1Repository'
import { dataUser } from '../types/user'

const getCustomer = '/GetCustomers '
const updateCustomer = '/UpdateCustomer'
const addCustomer = '/AddCustomer'
const getSingleCustomer = '/GetCustomer'
const businessID = '20160908110055249272'
// const businessID = !dataUser ? '' : dataUser.BusinessModel[0].BusinessID

export default {
  getCustomer() {
    return Repository.post(`${getCustomer}`, { business_id: businessID })
  },
  
  updateCustomer(payload: any) {
    return Repository.post(`${updateCustomer}`, { ...payload, business_id: businessID })
  },

  getSingleCustomer(CustomerID: any) {
    return Repository.post(`${getSingleCustomer}`, {
      business_id: businessID,
      CustomerID: CustomerID,
    })
  },
  

  addCustomer(payload: any) {
    return Repository.post(`${addCustomer}`, { ...payload, business_id: businessID })
  },
}
