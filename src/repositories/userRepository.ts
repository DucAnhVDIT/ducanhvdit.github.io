import Repository from './Version1Repository'

const login = '/ValidateUser'
const register = '/RegisterUser'
const reset = '/ResetPassword'

export default {
  login(payload: any) {
    return Repository.post(`${login}`, payload)
  },

  register(payload: any) {
    return Repository.post(`${register}`, payload)
  },

  reset(payload: any) {
    return Repository.post(`${reset}`, payload)
  },
}
