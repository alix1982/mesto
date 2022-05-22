import {Popup} from './Popup.js';

export class PopupWithImage extends Popup{
  constructor (popupSelector) {
    super (popupSelector);
    this.popupImgLink = popupSelector.querySelector('.popupImg__img');
    this. popupImgText = popupSelector.querySelector('.popupImg__text');
  }
  open (link, text) {
    this.popupImgLink.src = link;
    this.popupImgLink.alt = text;
    this.popupImgText.textContent = text;
    super.open ();
    super.setEventListeners();
  };
}

