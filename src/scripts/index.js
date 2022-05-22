import '../pages/index.css';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './data.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {PopupWithImage} from './PopupWithImage.js';
//import { data } from 'autoprefixer';

const obj = {
  formSelector: '.form',
  inputSelector: '.form__text',
  buttonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disable',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__message-error'
}

const element = document.querySelector('.element');

//Info

export const popupWinInfo = document.querySelector('.popupInfo');
export const inputInfoName = document.querySelector('.formInfo__text_name');
export const inputInfoWork = document.querySelector('.formInfo__text_work');
export const userInfo = new UserInfo ({name:'.profile__name', work:'.profile__work'});
const popupWithFormInfo = new PopupWithForm({
  popupSelector: popupWinInfo,
  handlerSubmit: () => {
    userInfo.setUserInfo(inputInfoName, inputInfoWork);
    
  }
});
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');
const formValidatorInfo = new FormValidator (obj, formInfo);

//Add
export const popupWinAdd = document.querySelector('.popupAdd');
const inputAddTitle = document.querySelector('.formAdd__text_title');
const inputAddLink = document.querySelector('.formAdd__text_link');
const popupWithFormAdd = new PopupWithForm({
  popupSelector: popupWinAdd,
  handlerSubmit: () => {element.prepend(getCard(inputAddLink.value, inputAddTitle.value))}
});
const formAdd = document.querySelector('.formAdd');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const formValidatorAdd = new FormValidator (obj, formAdd);

//Img
const popupWinImg = document.querySelector('.popupImg');

buttonProfileInfo.addEventListener('click',  () => {
  inputInfoName.value = userInfo.getUserInfo().name;
  inputInfoWork.value = userInfo.getUserInfo().work;
  formValidatorInfo.toggleButtonState();
  popupWithFormInfo.open(popupWinInfo);
});
buttonProfileAdd.addEventListener('click', () => {
  formValidatorAdd.toggleButtonState();
  popupWithFormAdd.open(popupWinAdd);
});

popupWithFormInfo.setEventListeners();
popupWithFormAdd.setEventListeners();

//отрисовка галереи
function getCard (link, title) {
  return new Card ({
      openImg: ( itemSrc, itemText) => {
        const popupWithImg = new PopupWithImage (popupWinImg);
        popupWithImg.open( itemSrc, itemText);
      }
    },
    link, title
  ).createCard();
};

const gallery = new Section ({
    items: initialCards,
    renderer: (item) => {
      const galleryElement = getCard(item.link, item.name);
      gallery.addItem(galleryElement);
    }
  }, '.element');
gallery.renderItems();

//валидация форм
formValidatorInfo.enableValidation ();
formValidatorAdd.enableValidation ();
