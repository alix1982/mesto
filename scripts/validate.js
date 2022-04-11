const obj = {
  formSelector: '.form',
  inputSelector: '.form__text',
  buttonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disable',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__message-error'
};

function activeButton (inputList) {
  return inputList.some(function(inputElement) {
    return (!inputElement.validity.valid);
  });
};
function toggleButton (key, inputList) {
  if (activeButton(inputList)) {
    key.classList.add(obj.inactiveButtonClass);
    key.setAttribute('disabled', true)
  } 
  else {
    key.classList.remove(obj.inactiveButtonClass);
    key.removeAttribute('disabled', true);
  }
}
function addTextError (inputElement, spanElement){
  inputElement.classList.add(obj.inputErrorClass);
  spanElement.textContent = inputElement.validationMessage;
}
function removeTextError (inputElement, spanElement) {
  inputElement.classList.remove(obj.inputErrorClass);
  spanElement.textContent = ' ';
}

function enableValidation (obj) 
  {const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach(function (form) {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.buttonSelector);
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    inputs.forEach(function (input) {
      input.addEventListener('input', function(evt) {
        const span = form.querySelector(`.${input.id}-error`);
        if (!evt.target.validity.valid) {addTextError(input, span)}
        else {removeTextError(input, span)};
        toggleButton(button, inputs);
      });
    });
  });
};
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__text',
    buttonSelector: '.form__save',
    inactiveButtonClass: 'form__save_disable',
    inputErrorClass: 'form__text_error',
    errorClass: 'form__message-error'
  });
