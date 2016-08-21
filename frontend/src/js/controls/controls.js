import ELEMENTS from '../elements';

export default {
  closeMenus() {
    Array.from(ELEMENTS.CONTROLS.querySelectorAll('.expandable.control > input[type="checkbox"]'))
      .forEach(menuControl => menuControl.checked = false);
  }
}
