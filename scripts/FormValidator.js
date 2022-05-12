//import {buttonProfileInfo, buttonProfileAdd, openFormInfo, openFormAdd} from './index.js';

export class FormValidator {
  constructor (obj, form) {
    this.obj = obj;
    this.form = form;
  }
 
  _addTextError (inputElement, inputErrorClass) {
    const span = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    span.textContent = inputElement.validationMessage;
  };

  _removeTextError (inputElement, inputErrorClass) {
    const span = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    span.textContent = ' ';
  };

  _activeButton (inputList) {
    return inputList.some(function(inputElement) {
      return (!inputElement.validity.valid);
    });
  };
  
  toggleButtonState (key, inputList, inactiveButtonClass) {
    if (this._activeButton(inputList)) {
      key.classList.add(inactiveButtonClass);
      key.setAttribute('disabled', true)
    }
    else {
      key.classList.remove(inactiveButtonClass);
      key.removeAttribute('disabled', true);
    };
  };

  enableValidation () {
    const inputs = Array.from(this.form.querySelectorAll(this.obj.inputSelector));
    const button = this.form.querySelector(this.obj.buttonSelector);
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) => {
        if (!evt.target.validity.valid) {this._addTextError (input, this.obj.inputErrorClass)}
        else {this._removeTextError(input, this.obj.inputErrorClass)};
        this.toggleButtonState(button, inputs, this.obj.inactiveButtonClass);
      });
    });
  };
}