import '../pages/index.css';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './data.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
 
const obj = {
  formSelector: '.form',
  inputSelector: '.form__text',
  buttonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disable',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__message-error'
}

export const element = document.querySelector('.element');
export const popup = new Popup('popup_opened');
const popupWithForm = new PopupWithForm('popup_opened');
//Info
export const popupWinInfo = document.querySelector('.popupInfo');
export const inputInfoName = document.querySelector('.formInfo__text_name');
export const inputInfoWork = document.querySelector('.formInfo__text_work');
const name = document.querySelector('.profile__name');
const work = document.querySelector('.profile__work');
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');
const formValidatorInfo = new FormValidator (obj, formInfo);
export const userInfo = new UserInfo (name, work);
//Add
export const popupWinAdd = document.querySelector('.popupAdd');
const formAdd = document.querySelector('.formAdd');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const formValidatorAdd = new FormValidator (obj, formAdd);

//обработчик открытия и отправки формы

buttonProfileInfo.addEventListener('click',  () => {
  userInfo.getUserInfo();
  formValidatorInfo.toggleButtonState();
});
buttonProfileAdd.addEventListener('click', () => {
  popup.openPopup(popupWinAdd);
  formValidatorAdd.toggleButtonState();
});

popupWithForm.setEventListeners(popupWinInfo);
popupWithForm.setEventListeners(popupWinAdd);

//отрисовка галереи
export const getCard = (link, title) => {
  return new Card (link, title).createCard();
};
const gallery = new Section ({ 
    items: initialCards,
    renderer: (item)=> {
    const galleryElement = getCard(item.link, item.name);
    gallery.addItem(galleryElement);
    }
  }, element);
gallery.renderItems();

//валидация форм
formValidatorInfo.enableValidation ();
formValidatorAdd.enableValidation ();
