import {Popup} from './Popup.js';

export class PopupWithDel extends Popup{
  constructor ({popupSelector, cardDelete} )
    {
      super (popupSelector);
      this._form = this.popupElement.querySelector('.form');
      this.cardDelete = cardDelete;
      //колбек
      this.buttonPopupDel = this.popupElement.querySelector('.popupDel__save');
    }
    
    addTextButton = () => {
      this.buttonPopupDel.textContent = "Да"
    }
  
    getElement = (elementImg, cardElement) => {
      this.elementImg = elementImg;
      this.cardElement = cardElement
    }

    setEventListeners = () => {
      super.setEventListeners();
      this.getElement();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.buttonPopupDel.textContent = "Удаление...";
        this.cardDelete(this.elementImg, this.cardElement);
      });
    }
}
