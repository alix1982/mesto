import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../components/data.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
//  import { data } from 'autoprefixer';

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
const inputInfoName = document.querySelector('.formInfo__text_name');
const inputInfoWork = document.querySelector('.formInfo__text_work');
const userInfo = new UserInfo ({name:'.profile__name', work:'.profile__work'});
const popupWithFormInfo = new PopupWithForm({
  popupSelector: '.popupInfo',
  handlerSubmit: (inputList) => {
    userInfo.setUserInfo(inputList);
  }
});
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');
const formValidatorInfo = new FormValidator (obj, formInfo);

//Add
const popupWithFormAdd = new PopupWithForm({
  popupSelector: '.popupAdd',
  handlerSubmit: (inputList) => {
    const card = new Section ({
      items: inputList,
       renderer: () => {}
    }, '.element');
    card.addItem(getCard(inputList.link, inputList.title));
  }
});
const formAdd = document.querySelector('.formAdd');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const formValidatorAdd = new FormValidator (obj, formAdd);

//
buttonProfileInfo.addEventListener('click',  () => {
  const dataInfo = userInfo.getUserInfo();
  // const inputList = dataInfo;
  // console.log(inputListI);
  // console.log(dataInfo);
  inputInfoName.value = dataInfo.name;
  inputInfoWork.value = dataInfo.work;
  formValidatorInfo.toggleButtonState();
  popupWithFormInfo.open();
});
buttonProfileAdd.addEventListener('click', () => {
  formValidatorAdd.toggleButtonState();
  popupWithFormAdd.open();
});

popupWithFormInfo.setEventListeners();
popupWithFormAdd.setEventListeners();

//отрисовка галереи
const popupWithImg = new PopupWithImage ({ popupSelector: '.popupImg' });
function getCard (link, title) {
  return new Card ({
      openImg: ( itemSrc, itemText) => {
        
        popupWithImg.open( itemSrc, itemText);
        popupWithImg.setEventListeners();
      }
    },
    link, title, '#foto'
  ).createCard();
};

const gallery = new Section ({
    items: initialCards,
    renderer: (item) => {
      const galleryElement = getCard(item.link, item.name);
      //console.log(galleryElement);
      gallery.addItem(galleryElement);
    }
  }, '.element');
gallery.renderItems();

//валидация форм
formValidatorInfo.enableValidation ();
formValidatorAdd.enableValidation ();
