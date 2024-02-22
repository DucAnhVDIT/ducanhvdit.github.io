import { toast } from 'react-toastify'

export const logErrorRegister = (res: any) => {
  if (res === 7) {
    toast.error('The email already exists')
  } else {
    toast.error('The user was not created by code number' + res)
  }
}

export const logSuccess = (text: any) => {
  toast.success(`${text}`, {
    position: 'top-center',
    autoClose: 3000, // Auto close the toast after 3 seconds
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const logError = (text: any) => {
  toast.error(`${text}`, {
    position: 'top-center',
    autoClose: 5000, // Auto close the toast after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}
