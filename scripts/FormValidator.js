export class FormValidator {
  constructor (obj, form) {
    this._obj = obj;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._obj.inputSelector));
    this._button = this._form.querySelector(this._obj.buttonSelector);
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

  _activeButton () {
    return this._inputList.some(function(inputElement) {
      return (!inputElement.validity.valid);
    });
  };
  
  toggleButtonState () {
    if (this._activeButton()) {
      this._button.classList.add(this._obj.inactiveButtonClass);
      this._button.setAttribute('disabled', true)
    }
    else {
      this._button.classList.remove(this._obj.inactiveButtonClass);
      this._button.removeAttribute('disabled', true);
    };
  };

  enableValidation () {
    this._inputList.forEach((input) => {
      input.addEventListener('input', (evt) => {
        if (!evt.target.validity.valid) {this._addTextError (input, this._obj.inputErrorClass)}
        else {this._removeTextError(input, this._obj.inputErrorClass)};
        this.toggleButtonState();
      });
    });
  };
}