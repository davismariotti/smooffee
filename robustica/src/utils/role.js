export const SYSADMIN = 'sysadmin'
export const ADMIN = 'admin'
export const EMPLOYEE = 'employee'
export const SUPERVISOR = 'supervisor'
export const CUSTOMER = 'customer'
export const ANONYMOUS = 'anonymous'

export const roles = {
  'sysadmin': 'System Admin',
  'admin': 'Admin',
  'employee': 'Employee',
  'supervisor': 'Supervisor',
  'customer': 'Customer',
  'anonymous': 'Anonymous'
}

export function translateRole(role) {
  return roles[role]
}
