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

const api = new Api (
  {
    heading: {
      authorization: '99b7a38f-d2ab-46ce-b602-198a4e9299a5',
      'Content-Type': 'application/json'
    }
  }
);

//Info
const inputInfoName = document.querySelector('.formInfo__text_name');
const inputInfoWork = document.querySelector('.formInfo__text_work');
const userInfo = new UserInfo ({name:'.profile__name', work:'.profile__work', avatar:'.profile__avatar'});
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');
const formValidatorInfo = new FormValidator (obj, formInfo);
const popupWithFormInfo = new PopupWithForm({
  popupSelector: '.popupInfo',
  handlerSubmit: (inputList) => {
    userInfo.setUserInfo(inputList);
    popupWithFormInfo.editTextButton();
    api.patchUserInfo('https://mesto.nomoreparties.co/v1/cohort-42/users/me', inputList)
      .then (() => {popupWithFormInfo.close()})
      .finally (() => {
          popupWithFormInfo.restoreTextButton('Сохранить');
        })
        .catch((err) => {
          console.log(err)
        })
  },
});

//Add
const formAdd = document.querySelector('.formAdd');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const formValidatorAdd = new FormValidator (obj, formAdd);
const popupWithFormAdd = new PopupWithForm({
  popupSelector: '.popupAdd',
  handlerSubmit: (inputList) => {
    popupWithFormAdd.editTextButton();
    api.postAddCard('https://mesto.nomoreparties.co/v1/cohort-42/cards', inputList)
      .then((result) => {
        const elementCard = {
          link: inputList.link,
          name: inputList.title,
          likes: [],
          _id: result._id,
          owner: {_id: 0}
        };
        section().addItem(getCard(elementCard))
        popupWithFormAdd.close();
      })
      .finally (() => {
        popupWithFormAdd.restoreTextButton('Создать');
      })
      .catch((err) => {
        console.log(err);
      })
  }
});

//avatar
const formAvatar = document.querySelector('.formAvatar');
const buttonProfileAvatar = document.querySelector('.profile__avatar-button');
const formValidatorAvatar = new FormValidator(obj, formAvatar);
const popupWithFormAvatar = new PopupWithForm({
  popupSelector: '.popupAvatar',
  handlerSubmit: (inputList) => {
    userInfo.setUserAvatar(inputList);
    popupWithFormAvatar.editTextButton();
    api.patchUserAvatar('https://mesto.nomoreparties.co/v1/cohort-42/users/me/avatar', inputList)
    .then (() => {popupWithFormAvatar.close()})
      .finally (() => {
        popupWithFormAvatar.restoreTextButton('Сохранить');
      })
      .catch((err) => {
        console.log(err)
      })
  }
});

//card Delete
const popupDel = new PopupWithDel ({
  popupSelector: '.popupDel', 
  cardDelete: (imgCard, cardElement) => {
    api.deleteCardDel('https://mesto.nomoreparties.co/v1/cohort-42/cards/', imgCard, 'DELETE')
      .then (() => {
        popupDel.cardDel
        cardElement.remove();
        cardElement = null;
        popupDel.close();
      })
      .catch((err) => {
        console.log(err)
      })
  }
});

popupDel.setEventListeners();

//открытие попапов Info, Add и Avatar (валидация и слушатели)
buttonProfileInfo.addEventListener('click',  () => {
  const dataInfo = userInfo.getUserInfo();
  inputInfoName.value = dataInfo.name;
  inputInfoWork.value = dataInfo.work;
  formValidatorInfo.toggleButtonState();
  popupWithFormInfo.open();
});
buttonProfileAdd.addEventListener('click', () => {
  formValidatorAdd.toggleButtonState();
  popupWithFormAdd.open();
});
buttonProfileAvatar.addEventListener('click', () => {
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
function getCard (element) {
  const card = new Card ({
    openImg: ( itemSrc, itemText) => {popupWithImg.open( itemSrc, itemText)},
    openPopupDel: (elementImg, cardElement) => {
      popupDel.open();
      popupDel.addTextButton();
      popupDel.getElement(elementImg, cardElement);
    },
    countLikes: (elementImg, method) => {return api.getCounterLike('https://mesto.nomoreparties.co/v1/cohort-42/cards/', elementImg, method)},
    getIdUser: () => {return api.getUser('https://nomoreparties.co/v1/cohort-42/users/me')}
  },
  element, '#foto');

  return card.createCard();
};

//для отрисовки галереи
function section (cards) {
  const gallery = new Section ({
    items: cards,
    renderer: (item) => {
      const galleryElement = getCard(item);
      gallery.addItem(galleryElement);
    },
    getArrayCard: () => {return api.getCards('https://mesto.nomoreparties.co/v1/cohort-42/cards')}
  }, '.element');
  return gallery;
}

//валидация форм
formValidatorInfo.enableValidation ();
formValidatorAdd.enableValidation ();
formValidatorAvatar.enableValidation ();



//данные пользователя с сервера
api.getUser('https://nomoreparties.co/v1/cohort-42/users/me')
  .then((result) => {
    const info = {
      name: result.name,
      work: result.about
    };
    const avatar = {linkAvatar: result.avatar}
    userInfo.setUserInfo(info);
    userInfo.setUserAvatar(avatar);
  })
  .catch((err) => {
    console.log(err);
  })

//отрисовка галереи
Promise.all([ api.getUser('https://nomoreparties.co/v1/cohort-42/users/me'), api.getCards('https://mesto.nomoreparties.co/v1/cohort-42/cards') ])
  .then (() => {
    section().renderItems();
  })
  .catch((err) => {
    console.log(err);
  })
