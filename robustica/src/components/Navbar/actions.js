export default class NavbarActions {
  static LEFT_MENU_OPEN = 'LEFT_MENU_OPEN'
  static LEFT_MENU_CLOSE = 'LEFT_MENU_CLOSE'

  static RIGHT_MENU_OPEN = 'RIGHT_MENU_OPEN'
  static RIGHT_MENU_CLOSE = 'RIGHT_MENU_CLOSE'

  static openLeftMenu() {
    return {
      type: NavbarActions.LEFT_MENU_OPEN
    }
  }

  static closeLeftMenu() {
    return {
      type: NavbarActions.LEFT_MENU_CLOSE
    }
  }

  static openRightMenu() {
    return {
      type: NavbarActions.RIGHT_MENU_OPEN
    }
  }

  static closeRightMenu() {
    return {
      type: NavbarActions.RIGHT_MENU_CLOSE
    }
  }
}