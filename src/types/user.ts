import { INewOrder, IRegister, IUser } from './types'

export const dataUser: IUser = JSON.parse(sessionStorage.getItem('user')!)

export const registerData: IRegister = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  password: '',
  telephone: 0,
  mobile: 0,
  fax: 0,
  companyAdd: '',
  street1: '',
  street2: '',
  town: '',
  county: '',
  postcode: '',
  country: '',
}

export const customerData: INewOrder = {
  CustomerID: 0,
  CustomerName: '',
  Mobile: 0,
  Email: '',
}
