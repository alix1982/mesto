/* let obj = {
  formSelector: '.form',
  inputSelector: '.form__text',
  buttonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disable',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__message-error'
}; */

function activeButton (inputList) {
  return inputList.some(function(inputElement) {
    return (!inputElement.validity.valid);
  });
};
function toggleButton (key, inputList, inactiveButtonClass) {
  if (activeButton(inputList)) {
    key.classList.add(inactiveButtonClass);
    key.setAttribute('disabled', true)
  } 
  else {
    key.classList.remove(inactiveButtonClass);
    key.removeAttribute('disabled', true);
  };
};
function addTextError (inputElement, inputErrorClass){
  const span = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  span.textContent = inputElement.validationMessage;
};
function removeTextError (inputElement, inputErrorClass) {
  const span = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  span.textContent = ' ';
};
function enableValidation (obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach(function (form) {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    const button = form.querySelector(obj.buttonSelector);
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    inputs.forEach(function (input) {
      input.addEventListener('input', function(evt) {
        //const span = form.querySelector(`.${inputElement.id}-error`);
        if (!evt.target.validity.valid) {addTextError(input, obj.inputErrorClass)}
        else {removeTextError(input, obj.inputErrorClass)};
        toggleButton(button, inputs, obj.inactiveButtonClass);
      });
    });
  });
  buttonProfileInfo.addEventListener('click', function () {openFormInfo(obj.inactiveButtonClass)});
  buttonProfileAdd.addEventListener('click', function () {openFormAdd(obj.inactiveButtonClass)});
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__text',
  buttonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disable',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__message-error'
});
