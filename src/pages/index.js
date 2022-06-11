import '../pages/index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
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
    url: 'https://mesto.nomoreparties.co/v1/cohort-42',
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
    popupWithFormInfo.editTextButton();
    api.patchUserInfo (inputList)
      .then (() => {
        userInfo.setUserInfo (inputList);
        popupWithFormInfo.close()
      })
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
    api.postAddCard(inputList)
      .then((result) => {
        section().addItem(getCard(result))
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
    popupWithFormAvatar.editTextButton();
    api.patchUserAvatar(inputList)
      .then (() => {
        popupWithFormAvatar.close();
        userInfo.setUserAvatar(inputList);
      })
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
  cardDelete: (itemId, cardElement) => {
    api.deleteCardDel(itemId, 'DELETE')
      .then (() => {
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
    openPopupDel: (cardElement) => {
      popupDel.open();
      popupDel.addTextButton();
      popupDel.getElement(card.element._id, cardElement);
    },
    toggleLike: (itemId, method) => {
      api.getCounterLike(itemId, method)
        .then (() => {
          card.addLike()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  element, user, '#foto');

  return card.createCard();
};

//для отрисовки галереи
function section () {
  const gallery = new Section ({
    renderer: (item) => {
      const galleryElement = getCard(item);
      gallery.addItem(galleryElement);
    }
  }, '.element');
  return gallery;
}

//валидация форм
formValidatorInfo.enableValidation ();
formValidatorAdd.enableValidation ();
formValidatorAvatar.enableValidation ();

let user = null;

//получение и отрисовкаданных пользователя и галереи
Promise.all([ api.getUser(), api.getCards() ])
  .then(([resultUser, resultCards]) => {
    user = resultUser;
    const info = {
      name: resultUser.name,
      work: resultUser.about
    };
    const avatar = {linkAvatar: resultUser.avatar}
    userInfo.setUserInfo(info);
    userInfo.setUserAvatar(avatar);
    section().renderItems(resultCards);
  })
  .catch((err) => {
    console.log(err);
  })

