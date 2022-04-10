const forms = Array.from(document.querySelectorAll('.form'));
const obj = {};

function activeButton (inputList) {
  return inputList.some(function(inputElement) {
    return (!inputElement.validity.valid);
  });
};
function toggleButton (key, inputList) {
  if (activeButton(inputList)) {
    key.classList.add('form__save_disable');
    key.setAttribute('disabled', true)
  } 
  else {
    key.classList.remove('form__save_disable');
    key.removeAttribute('disabled', true);
  }
}
function addTextError (inputElement, spanElement){
  inputElement.classList.add('form__text_error');
  spanElement.textContent = inputElement.validationMessage;
}
function removeTextError (inputElement, spanElement) {
  inputElement.classList.remove('form__text_error');
  spanElement.textContent = ' ';
}

function enableValidation(
  obj = {form: formElement, 
         inputs: inputList,
         spans: '.form__message-error',
         button: '.form__save'
         }
  ) 
  {const spans = Array.from(obj.form.querySelectorAll(obj.spans));
  const button = obj.form.querySelector(obj.button);
  obj.inputs.forEach(function (input, index) {
      input.addEventListener('input', function(evt) {
      if (!evt.target.validity.valid) {addTextError(input, spans[index])} 
      else {removeTextError(input, spans[index])};
      toggleButton(button, obj.inputs);
    });
  });
};

forms.forEach(function (form) {
  let inputs = Array.from(form.querySelectorAll('.form__text'));
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
  });
  enableValidation({
    form: form, 
    inputs: inputs,
    spans: '.form__message-error',
    button: '.form__save'
  });
});

