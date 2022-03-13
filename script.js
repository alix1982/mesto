let popup=document.querySelector('.profile__info-button');
let popupWin=document.querySelector('.popup');
let close=document.querySelector('.form__close');
let formInput=document.querySelector('.form__input');
let input=document.querySelectorAll('.form__text');
let save=document.querySelectorAll('.form__save');
let name=document.querySelector('.profile__name');
let work=document.querySelector('.profile__work');
let buttonProfile=document.querySelector('.profile__info-button');

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent=input[0].value
  work.textContent=input[1].value
  popupWin.classList.remove('popup__opened')
}

function formOpen () {
  input[0].value=(name.textContent);
  input[1].value=(work.textContent);
  popupWin.classList.add('popup__opened')
}

popup.addEventListener('click', formOpen);
close.addEventListener('click', function() {popupWin.classList.remove('popup__opened')});
formInput.addEventListener('submit', formSubmitHandler);

