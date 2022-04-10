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
const element = document.querySelector('.element');
const card = document.querySelector('#foto').content;
const popups = document.querySelectorAll('.popup');
const popupWinInfo = document.querySelector('.popupInfo');
const inputsInfo = Array.from(document.querySelectorAll('.formInfo__text'));
const name = document.querySelector('.profile__name');
const work = document.querySelector('.profile__work');
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');
const popupWinAdd = document.querySelector('.popupAdd');
const inputsAdd = Array.from(document.querySelectorAll('.formAdd__text'));
const buttonProfileAdd = document.querySelector('.profile__add-button');
const formAdd = document.querySelector('.formAdd');
const popupWinImg = document.querySelector('.popupImg');
const popupImg = document.querySelector('.popupImg__img');
const popupText= document.querySelector('.popupImg__text')
const buttons =document.querySelectorAll('.form__save')

function createCard (itemSrc, itemText) {
  const cardOnline = card.querySelector('.element__list').cloneNode(true);
  cardOnline.querySelector('.element__img').src = itemSrc;
  cardOnline.querySelector('.element__img').alt = itemText;
  cardOnline.querySelector('.element__text').textContent = itemText;
  like (cardOnline);
  del (cardOnline);
  openImg (cardOnline);
  return cardOnline;
};
function escEventListener (evt){
  popups.forEach(function (item) {
    if (evt.key === 'Escape') {
      closePopup(item);
      //console.log(evt.key);
    };
  });
}
function openPopup (popup) {
  popup.classList.add('popup_opened');
  popup.style = 'transition: visibility 0s, opacity 1s linear;';
  document.addEventListener('keydown', escEventListener);
};
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.style = 'transition: visibility 1s, opacity 1s linear;';
  document.removeEventListener('keydown', escEventListener);
};
function openFormInfo () {
  inputsInfo[0].value = (name.textContent);
  inputsInfo[1].value = (work.textContent);
  toggleButton(buttons[0], inputsInfo);
  openPopup(popupWinInfo);
};
function submitFormInfo (evt) {
  evt.preventDefault();
  name.textContent = inputsInfo[0].value;
  work.textContent = inputsInfo[1].value;
  closePopup(popupWinInfo);
};
function openFormAdd () {
  inputsAdd[0].value = '';
  inputsAdd[1].value = '';
  toggleButton(buttons[1], inputsAdd);
  openPopup(popupWinAdd);
};
function submitFormAdd (evt) {
  evt.preventDefault();
  element.prepend(createCard(inputsAdd[1].value, inputsAdd[0].value));
  closePopup(popupWinAdd);
}
function like (evt) {
  evt.querySelector('.element__like').addEventListener('click', function() {
    evt.querySelector('.element__like').classList.toggle('element__like_active');
  });
};
function del (evt) {
  evt.querySelector('.element__del').addEventListener('click', function() {
    evt.remove()
  });
};
function openImg (evt) {
  evt.querySelector('.element__img').addEventListener('click', function() {
    popupImg.src = evt.querySelector('.element__img').src;
    popupImg.alt = evt.querySelector('.element__text').textContent;
    popupText.textContent = evt.querySelector('.element__text').textContent;
    openPopup(popupWinImg);
  });
}
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

//отрисовка галереи
for (let i = 0; i<initialCards.length; i++) {
  element.append(createCard(initialCards[i].link, initialCards[i].name));
};

// обработчик закрытия попапов
popups.forEach(function (item) {
  item.querySelector('.popup__close').addEventListener('click', function () {
    closePopup(item);
  });
  item.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget){
      closePopup(item);
    }
  });
});
//обработчик открытия и отправки формы Info
buttonProfileInfo.addEventListener('click', openFormInfo);
formInfo.addEventListener('submit', submitFormInfo);
//обработчик открытия и отправки формы Add
buttonProfileAdd.addEventListener('click', openFormAdd);
formAdd.addEventListener('submit', submitFormAdd);
