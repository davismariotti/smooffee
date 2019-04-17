const AUTH_TOKEN = 'AUTH_TOKEN'
const USER_ID = 'USER_ID'
const USER_ROLE = 'USER_ROLE'
const ORGANIZATION_ID = 'ORGANIZATION_ID'

export class StorageService {
  static getUserId() {
    return localStorage.getItem(USER_ID)
  }

  static setUserId(userId) {
    localStorage.setItem(USER_ID, userId)
  }

  static getUserRole() {
    return localStorage.getItem(USER_ROLE)
  }

  static setUserRole(userRole) {
    localStorage.setItem(USER_ROLE, userRole)
  }

  static getOrganizationId() {
    return localStorage.getItem(ORGANIZATION_ID)
  }

  static setOrganizationId(organizationId) {
    localStorage.setItem(ORGANIZATION_ID, organizationId)
  }

  static getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN)
  }

  static setAuthToken(authToken) {
    localStorage.setItem(AUTH_TOKEN, authToken)
  }

  static clearAll() {
    StorageService.setUserRole('')
    StorageService.setOrganizationId('')
    StorageService.setUserId('')
    StorageService.setAuthToken('')
  }
}
