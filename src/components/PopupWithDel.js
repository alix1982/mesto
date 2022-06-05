import {Popup} from './Popup.js';

export class PopupWithDel extends Popup{
  constructor ({popupSelector, cardDelete} )
    {
      super (popupSelector);
      this.cardDelete = cardDelete;
      this.buttonPopupDel = this.popupElement.querySelector('.popupDel__save');
    }

    element = (cardElement) => {
      this.cardElement = cardElement;
      return this.cardElement;
    }

    setEventListeners = () => {
      super.setEventListeners();
      this.element();
      this.buttonPopupDel.addEventListener('click', () => {
        const imgCard = this.cardElement.querySelector('.element__img');
        this.cardDelete(imgCard);
        this.cardElement.remove();
        this.cardElement = null;
      });
    }
}
