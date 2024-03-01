export interface IRegister {
  firstName: string
  lastName: string
  companyName: string
  email: string
  password: string
  telephone: number
  mobile: number
  fax: number
  companyAdd: string
  street1: string
  street2: string
  town: string
  county: string
  postcode: string
  country: string
}

export interface IUser {
  AccountID: number
  FirstName: string
  LastName: string
  Email: string
  UserLevel: number
  NameNo: number
  BusinessModel: [
    {
      BusinessID: string
      BusinessName: string
    }
  ]
}

export interface ICategory {
  CategoryID: number
  CompanyID: string
  CategoryName: string
  Description: string
  CategoryIndex: number
  CategoryImage: string
  OrderNo: number
}

export interface INewOrder {
  CustomerID: number
  CustomerName: string
  Mobile: number
  Email: string
}
