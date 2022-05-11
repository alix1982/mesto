import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const obj = {
  formSelector: '.form',
  inputSelector: '.form__text',
  buttonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disable',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__message-error'
}

const popups = document.querySelectorAll('.popup');
const element = document.querySelector('.element');
const popupWinInfo = document.querySelector('.popupInfo');
const inputsInfo = Array.from(document.querySelectorAll('.formInfo__text'));
const inputInfoName = document.querySelector('.formInfo__text_name');
const inputInfoWork = document.querySelector('.formInfo__text_work');
const name = document.querySelector('.profile__name');
const work = document.querySelector('.profile__work');
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');
const popupWinAdd = document.querySelector('.popupAdd');
const inputsAdd = Array.from(document.querySelectorAll('.formAdd__text'));
const inputAddTitle = document.querySelector('.formAdd__text_title');
const inputAddLink = document.querySelector('.formAdd__text_link');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const formAdd = document.querySelector('.formAdd');
const buttonInfo = document.querySelector('.formInfo__save');
const buttonAdd = document.querySelector('.formAdd__save');
  
function escEventListener (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escEventListener);
};
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escEventListener);
};
function openFormInfo (inactiveButtonClass) {
  inputInfoName.value = name.textContent;
  inputInfoWork.value = work.textContent;
  new FormValidator (obj, form)._toggleButton(buttonInfo, inputsInfo, inactiveButtonClass);
  openPopup(popupWinInfo);
};
function submitFormInfo (evt) {
  evt.preventDefault();
  name.textContent = inputInfoName.value;
  work.textContent = inputInfoWork.value;
  closePopup(popupWinInfo);
};
function openFormAdd (inactiveButtonClass) {
  inputAddTitle.value = '';
  inputAddLink.value = '';
  new FormValidator (obj, form)._toggleButton(buttonAdd, inputsAdd, inactiveButtonClass);
  openPopup(popupWinAdd);
};
function submitFormAdd (evt) {
  evt.preventDefault();
  element.prepend(new Card ().createCard(inputAddLink.value, inputAddTitle.value));
  closePopup(popupWinAdd);
};

// обработчик закрытия попапов
popups.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))){
      closePopup(item);
    };
  });
});

//обработчик отправки формы Info и Add
formInfo.addEventListener('submit', submitFormInfo);
formAdd.addEventListener('submit', submitFormAdd);

//отрисовка галереи
for (let i = 0; i<initialCards.length; i++) {
  element.append(new Card ().createCard(initialCards[i].link, initialCards[i].name));
};

//валидация форм
new FormValidator (obj, formInfo).enableValidation (obj, formInfo);
new FormValidator (obj, formAdd).enableValidation (obj, formAdd);

export {buttonProfileInfo, buttonProfileAdd, openFormInfo, openFormAdd,openPopup};