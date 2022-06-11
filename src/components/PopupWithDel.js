import {Popup} from './Popup.js';

export class PopupWithDel extends Popup{
  constructor ({popupSelector, cardDelete} )
    {
      super (popupSelector);
      this._form = this.popupElement.querySelector('.form');
      this.cardDelete = cardDelete;
      this.buttonPopupDel = this.popupElement.querySelector('.popupDel__save');
    }
    
    addTextButton = () => {
      this.buttonPopupDel.textContent = "Да"
    }

    getElement = (itemId, cardElement) => {
      this.itemId = itemId;
      this.cardElement = cardElement
    }

    setEventListeners = () => {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.buttonPopupDel.textContent = "Удаление...";
        this.cardDelete(this.itemId, this.cardElement);
      });
    }
}

