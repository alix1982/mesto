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
let card = document.querySelector('#foto').content;
let buttonElementDel = document.querySelectorAll('.element__del');

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

//  попапы Info и Add
let popupWin = document.querySelector('.popup');
let close = document.querySelector('.popup__close');
let form = document.querySelector('.form');
let heading = document.querySelector('.popup__heading');
let input = document.querySelectorAll('.form__text');
let save = document.querySelector('.form__save');
let name = document.querySelector('.profile__name');
let work = document.querySelector('.profile__work');
let buttonProfileInfo = document.querySelector('.profile__info-button');
let buttonProfileAdd = document.querySelector('.profile__add-button');

function closePopup () {
  popupWin.classList.remove('popup_opened');
  popupWin.style = 'transition: visibility 1s, opacity 1s linear;'
}

function openPopup () {
  popupWin.classList.add('popup_opened');
  popupWin.style = 'transition: visibility 0s, opacity 1s linear;'
}

function formOpenInfo () {
  heading.textContent = 'Редактировать профиль';
  input[0].value = (name.textContent);
  input[1].value = (work.textContent);
  input[0].placeholder = 'Жак-Ив Кусто';
  input[1].placeholder = 'Иссдедователь океана';
  save.textContent = 'Сохранить';
  openPopup();
}

function formOpenAdd () {
  heading.textContent = 'Новое место';
  input[0].value = '';
  input[1].value = '';  
  input[0].placeholder = 'Название';
  input[1].placeholder = 'Ссылка на картинку'; 
  save.textContent = 'Создать';
  openPopup();
};

function formSubmit (evt) {
  evt.preventDefault();
  if (heading.textContent === 'Новое место') {
    let cardOnline = card.querySelector('.element__list').cloneNode(true);
    cardOnline.querySelector('.element__img').src = input[1].value;
    cardOnline.querySelector('.element__text').textContent = input[0].value;
    like (cardOnline);
    del (cardOnline);
    openImg (cardOnline);
    element.prepend(cardOnline);
    closePopup();
  }
  else {
    name.textContent = input[0].value;
    work.textContent = input[1].value;
    closePopup();
  }
}

buttonProfileInfo.addEventListener('click', formOpenInfo);
buttonProfileAdd.addEventListener('click', formOpenAdd);
close.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmit);
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