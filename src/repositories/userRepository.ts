import Repository from './Version1Repository'

const login = '/ValidateUser'
const register = '/RegisterUser'

export default {
  login(payload: any) {
    return Repository.post(`${login}`, payload)
  },

  register(payload: any) {
    return Repository.post(`${register}`, payload)
  },
}
