import { AsyncStorage } from 'react-native'

const USER_ID = 'USER_ID'
const ORGANIZATION_ID = 'ORGANIZATION_ID'

export class StorageService {
  static getUserId() {
    return AsyncStorage.getItem(USER_ID)
  }

  static setUserId(userId) {
    console.log('setUserId', userId)
    return AsyncStorage.setItem(USER_ID, userId)
  }

  static getOrganizationId() {
    return AsyncStorage.getItem(ORGANIZATION_ID)
  }

  static setOrganizationId(organizationId) {
    return AsyncStorage.setItem(ORGANIZATION_ID, organizationId)
  }

  static clearAll() {
    StorageService.setOrganizationId('')
    StorageService.setUserId('')
  }
}
