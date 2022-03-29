//отрисовка галереи
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

let element = document.querySelector('.element');
const card = document.querySelector('#foto').content;

for (let i = 0; i<initialCards.length; i++) {
  let cardOnline = card.querySelector('.element__list').cloneNode(true);
  cardOnline.querySelector('.element__img').src = initialCards[i].link;
  cardOnline.querySelector('.element__text').textContent = initialCards[i].name;
  like (cardOnline);
  del (cardOnline);
  openImg (cardOnline);
  element.append(cardOnline);
};
//

//  попап Info
let popupWinInfo = document.querySelector('.popupInfo');
let inputInfo = document.querySelectorAll('.formInfo__text');
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');
const closeInfo = document.querySelector('.popupInfo__close');
const formInfo = document.querySelector('.formInfo');
const buttonProfileInfo = document.querySelector('.profile__info-button');

function closePopupInfo () {
  popupWinInfo.classList.remove('popupInfo_opened');
  popupWinInfo.style = 'transition: visibility 1s, opacity 1s linear;'
};
function openPopupInfo () {
  popupWinInfo.classList.add('popupInfo_opened');
  popupWinInfo.style = 'transition: visibility 0s, opacity 1s linear;'
};
function formOpenInfo () {
  inputInfo[0].value = (name.textContent);
  inputInfo[1].value = (work.textContent);
  openPopupInfo();
};
function formSubmitInfo (evt) {
  evt.preventDefault();
  name.textContent = inputInfo[0].value;
  work.textContent = inputInfo[1].value;
  closePopupInfo();
};

buttonProfileInfo.addEventListener('click', formOpenInfo);
closeInfo.addEventListener('click', closePopupInfo);
formInfo.addEventListener('submit', formSubmitInfo);
//


//  попап Add
let popupWinAdd = document.querySelector('.popupAdd');
let inputAdd = document.querySelectorAll('.formAdd__text');
const buttonProfileAdd = document.querySelector('.profile__add-button');
const closeAdd = document.querySelector('.popupAdd__close');
const formAdd = document.querySelector('.formAdd');

function closePopupAdd () {
  popupWinAdd.classList.remove('popupAdd_opened');
  popupWinAdd.style = 'transition: visibility 1s, opacity 1s linear;'
}
function openPopupAdd () {
  popupWinAdd.classList.add('popupAdd_opened');
  popupWinAdd.style = 'transition: visibility 0s, opacity 1s linear;'
}
function formOpenAdd () {
  inputAdd[0].value = '';
  inputAdd[1].value = '';
  openPopupAdd();
};
function formSubmitAdd (evt) {
  evt.preventDefault();
  let cardOnline = card.querySelector('.element__list').cloneNode(true);
  cardOnline.querySelector('.element__img').src = inputAdd[1].value;
  cardOnline.querySelector('.element__text').textContent = inputAdd[0].value;
  like (cardOnline);
  del (cardOnline);
  openImg (cardOnline);
  element.prepend(cardOnline);
  closePopupAdd();
}

buttonProfileAdd.addEventListener('click', formOpenAdd);
closeAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', formSubmitAdd);
//


//установка лайков
function like (evt) {
  evt.querySelector('.element__like').addEventListener('click', function() {
    evt.querySelector('.element__like').classList.toggle('element__like_active');
  });
  };
//

// удаление карточек
function del (evt) {
  evt.querySelector('.element__del').addEventListener('click', function() {
    evt.remove()
  });
};
//

//открытие фото
let popupWinImg = document.querySelector('.popupImg');
let closeImg = document.querySelector('.popupImg__close');
function openImg (evt) {
  evt.querySelector('.element__img').addEventListener('click', function() {
    document.querySelector('.popupImg__img').src = evt.querySelector('.element__img').src;
    document.querySelector('.popupImg__text').textContent = evt.querySelector('.element__text').textContent;
    popupWinImg.style = 'transition: visibility 0s, opacity 1s linear;'
    popupWinImg.classList.add('popupImg_opened');
  });
}
function closePopupImg () {
  popupWinImg.classList.remove('popupImg_opened');
  popupWinImg.style = 'transition: visibility 1s, opacity 1s linear;'
}

closeImg.addEventListener('click', closePopupImg);
//