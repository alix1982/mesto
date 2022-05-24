import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
  constructor ({ popupSelector, handlerSubmit })
    {
      super (popupSelector),
      this.handlerSubmit = handlerSubmit;
      this._form = this.popupElement.querySelector('.form')
    }

    _getInputValues = () => {
      this._inputList = Array.from(this.popupElement.querySelectorAll('.form__text'));
      this._formValues = {};
      this._inputList.forEach(input => {
        // разобраться
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    };
    
    setEventListeners = () => {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.handlerSubmit(this._getInputValues ());
        this.close();
      });
    };
    close () {
      super.close();
      this._form.reset();
    };
}
