import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
//import {initialCards} from '../utils/data.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithDel} from '../components/PopupWithDel.js';
import {Api} from '../components/Api.js';

const obj = {
  formSelector: '.form',
  inputSelector: '.form__text',
  buttonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disable',
  inputErrorClass: 'form__text_error',
  errorClass: 'form__message-error'
};

//Info
const inputInfoName = document.querySelector('.formInfo__text_name');
const inputInfoWork = document.querySelector('.formInfo__text_work');
const userInfo = new UserInfo ({name:'.profile__name', work:'.profile__work'});
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');
const formInfoButtonSave = document.querySelector('.formInfo__save');
const formValidatorInfo = new FormValidator (obj, formInfo);

const apiUserInfo = new Api (
  {
    render: () => {},
    renderClose: () => {popupWithFormInfo.close()}
  }
  );

const popupWithFormInfo = new PopupWithForm({
  popupSelector: '.popupInfo',
  handlerSubmit: (inputList) => {
    userInfo.setUserInfo(inputList);
    formInfoButtonSave.textContent = 'Сохранение ...';
    apiUserInfo.getUserInfo(inputList);
  }
});


//Add
const formAdd = document.querySelector('.formAdd');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const formValidatorAdd = new FormValidator (obj, formAdd);
const formAddButtonSave = document.querySelector('.formAdd__save');

const apiAddCard = new Api (
  {
    render: (inputList, result) => {section().addItem(getCard(inputList.link, inputList.title, 0, result._id))},
    renderClose: () => {popupWithFormAdd.close()}
  }
);

const popupWithFormAdd = new PopupWithForm({
  popupSelector: '.popupAdd',
  handlerSubmit: (inputList) => {
    formAddButtonSave.textContent = 'Сохранение ...';
    apiAddCard.getAddCard(inputList)
  }
});

//avatar
const elementAvatar = document.querySelector('.profile__avatar');
const formAvatar = document.querySelector('.formAvatar');
const buttonProfileAvatar = document.querySelector('.profile__avatar-button');
const formValidatorAvatar = new FormValidator(obj, formAvatar);
const formAvatarButtonSave = document.querySelector('.formAvatar__save');

const apiUserAvatar = new Api (
  {
    render: () => {},
    renderClose: () => {popupWithFormAvatar.close()}
  }
);

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: '.popupAvatar',
  handlerSubmit: (inputList) => {
    elementAvatar.src = inputList.linkAvatar;
    formAvatarButtonSave.textContent = 'Сохранение ...';
    apiUserAvatar.getUserAvatar(inputList);
  }
});

//card Delete
const formDelete = document.querySelector('.popupDel__cell');
const buttonPopupDel = document.querySelector('.popupDel__save');

const apiCardDel = new Api (
  {render: () => {}}
);

const popupDel = new PopupWithDel ({
  popupSelector: '.popupDel', 
  cardDelete: (imgCard) => {
    apiCardDel.getCardDel(imgCard, 'DELETE');
    popupDel.close();
  }
});

popupDel.setEventListeners();

//открытие попапов Info, Add и Avatar (валидация и слушатели)
buttonProfileInfo.addEventListener('click',  () => {
  formInfoButtonSave.textContent = 'Сохранить';
  const dataInfo = userInfo.getUserInfo();
  inputInfoName.value = dataInfo.name;
  inputInfoWork.value = dataInfo.work;
  formValidatorInfo.toggleButtonState();
  popupWithFormInfo.open();
});
buttonProfileAdd.addEventListener('click', () => {
  formAddButtonSave.textContent = 'Создать';
  formValidatorAdd.toggleButtonState();
  popupWithFormAdd.open();
});
buttonProfileAvatar.addEventListener('click', () => {
  formAvatarButtonSave.textContent = 'Сохранить';
  formValidatorAvatar.toggleButtonState();
  popupWithFormAvatar.open();
});
popupWithFormInfo.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormAvatar.setEventListeners();


//открытие попапа просмотра карточки(слушатели)
const popupWithImg = new PopupWithImage ({ popupSelector: '.popupImg' });
popupWithImg.setEventListeners();

//для создание карточки
function getCard (link, title, counter, id) {
  const apiCounterLike = new Api (
    {render: () => {}}
  );

  const card = new Card ({
    openImg: ( itemSrc, itemText) => {popupWithImg.open( itemSrc, itemText)},
    openPopupDel: (cardElement) => {
      popupDel.open();
      popupDel.element(cardElement)
    },
    countLikes: (elementImg, method) => {apiCounterLike.getCounterLike(elementImg, method)}
  },
  link, title, counter, id, '#foto');

  return card.createCard();
};

//для отрисовки галереи
function section (cards) {
  const gallery = new Section ({
    items: cards,
    renderer: (item) => {
      const galleryElement = getCard(item.link, item.name, item.likes.length, item._id);
      gallery.addItem(galleryElement);
    }
  }, '.element');
  return gallery;
}

//отрисовка галереи
const apiCards = new Api (
  {render: (result) => {section (result).renderItems();}}
  );

apiCards.getCards();

//валидация форм
formValidatorInfo.enableValidation ();
formValidatorAdd.enableValidation ();
formValidatorAvatar.enableValidation ();

//данные пользователя с сервера
const apiUser = new Api (
  {render: () => {}}
  );
apiUser.getUser();
