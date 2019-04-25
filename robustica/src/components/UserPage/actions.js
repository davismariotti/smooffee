export default class UserPageActions {
  static CHANGE_TAB = 'CHANGE_TAB'

  static changeTab(selectedTab) {
    return {
      type: UserPageActions.CHANGE_TAB,
      payload: {
        selectedTab
      }
    }
  }
}