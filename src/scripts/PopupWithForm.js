import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
  constructor ({ popupSelector, handlerSubmit })
    {
      super (popupSelector),
      this.handlerSubmit = handlerSubmit;
      this._form = this.popupSelector.querySelector('.form')
    }
    _getInputValues = () => {
      const inputs = Array.from(this.popupSelector.querySelectorAll('.form__text'))
      return this.inputs = inputs;
    };
    
    setEventListeners = () => {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._getInputValues ();
        this.handlerSubmit();
        this.close();
      });
    };
    close () {
      super.close();
      this.popupSelector.querySelector('.form').reset();
    };
}
