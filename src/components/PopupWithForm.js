import {Popup} from './Popup.js';

export class PopupWithForm extends Popup{
  constructor ({ popupSelector, handlerSubmit })
    {
      super (popupSelector),
      this.handlerSubmit = handlerSubmit;
      this._form = this.popupElement.querySelector('.form');
      this._inputList = this._form.querySelectorAll('.form__text');
      this.formButtonSave = this._form.querySelector('.form__save');
    }

    _getInputValues = () => {
      this._formValues = {};
      this._inputList.forEach(input => {
        // разобраться
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    };

    editTextButton = () => {
      this.formButtonSave.textContent = 'Сохранение ...';
    }

    restoreTextButton = (text) => {
      this.formButtonSave.textContent = text;
    }

    setEventListeners = () => {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.handlerSubmit(this._getInputValues ());
      });
    };

    close () {
      super.close();
      this._form.reset();
    };
}


