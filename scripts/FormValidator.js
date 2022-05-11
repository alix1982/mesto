import {buttonProfileInfo, buttonProfileAdd, openFormInfo, openFormAdd} from './index.js';
export class FormValidator {
  constructor (obj, form) {
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
  
  _toggleButton (key, inputList, inactiveButtonClass) {
    if (this._activeButton(inputList)) {
      key.classList.add(inactiveButtonClass);
      key.setAttribute('disabled', true)
    }
    else {
      key.classList.remove(inactiveButtonClass);
      key.removeAttribute('disabled', true);
    };
  };

  enableValidation (obj, form) {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.buttonSelector);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) => {
        if (!evt.target.validity.valid) {this._addTextError (input, obj.inputErrorClass)}
        else {this._removeTextError(input, obj.inputErrorClass)};
        this._toggleButton(button, inputs, obj.inactiveButtonClass);
      });
    });
    buttonProfileInfo.addEventListener('click',  () => {openFormInfo(obj.inactiveButtonClass)});
    buttonProfileAdd.addEventListener('click', () => {openFormAdd(obj.inactiveButtonClass)});
  };
}