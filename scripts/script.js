let popup = document.querySelector('.profile__info-button');
let popupWin = document.querySelector('.popup');
let close = document.querySelector('.popup__close');
let form = document.querySelector('.form');
let input = document.querySelectorAll('.form__text');
let save = document.querySelectorAll('.form__save');
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');
let buttonProfile = document.querySelector('.profile__info-button');

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent=input[0].value
  work.textContent=input[1].value
  popupWin.classList.remove('popup_opened')
}

function formOpen () {
  input[0].value=(name.textContent);
  input[1].value=(work.textContent);
  popupWin.classList.add('popup_opened');
}

function closePopup () {
  popupWin.classList.remove('popup_opened');
}

popup.addEventListener('click', formOpen);
close.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);

