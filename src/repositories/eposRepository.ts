import Repository from './Version1Repository'
import { dataUser } from '../types/user'

const getServicesCategory = '/GetServicesCategory'
const businessID = dataUser.BusinessModel[0].BusinessID

export default {
  getServicesCategory() {
    return Repository.post(`${getServicesCategory}`, {
      business_id: '20160908110055249272',
    })
  },
}
