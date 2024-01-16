import { toast } from 'react-toastify'

export const logErrorRegister = (res: any) => {
  if (res === 7) {
    toast.error('The email already exists')
  } else {
    toast.error('The user was not created by code number' + res)
  }
}
