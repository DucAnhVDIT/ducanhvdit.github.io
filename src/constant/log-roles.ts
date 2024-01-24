export const rolesName = (data: any) => {
  let rolesLabel = ''
  switch (data) {
    case 0:
      rolesLabel = 'User'
      break
    case 1:
      rolesLabel = 'Admin'
      break
    case 2:
      rolesLabel = 'Staff Roles'
      break
    case 3:
      rolesLabel = 'Company Account'
      break
    case 4:
      rolesLabel = 'Beauty Booking Only'
      break
    case 5:
      rolesLabel = 'Accountant'
      break
    case 6:
      rolesLabel = 'Sales'
      break
    case 7:
      rolesLabel = 'Technical'
      break
    case 8:
      rolesLabel = 'Signable'
      break
    case 9:
      rolesLabel = 'Manager'
      break
    case 10:
      rolesLabel = 'Technical Manager'
      break
  }
  return rolesLabel
}
