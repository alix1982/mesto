import {Popup} from './Popup.js';
import {popup} from './index.js';

export class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super (popupSelector);
  }
  openPopup = (element, link, text) => {
    element.querySelector('.element__img').addEventListener('click', () => {
      const popupWinImg = document.querySelector('.popupImg');
      const popupImg = document.querySelector('.popupImg__img');
      const popupText = document.querySelector('.popupImg__text');
      popupImg.src = link;
      popupImg.alt = text;
      popupText.textContent = text;
      popup.openPopup (popupWinImg);
      popup.setEventListener (popupWinImg);
    });
  };
}