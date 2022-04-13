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
const popupWinImg = document.querySelector('.popupImg');
const popupImg = document.querySelector('.popupImg__img');
const popupText = document.querySelector('.popupImg__text');
const buttonInfo = document.querySelector('.formInfo__save');
const buttonAdd = document.querySelector('.formAdd__save');

function createCard (itemSrc, itemText) {
  const cardOnline = card.querySelector('.element__list').cloneNode(true);
  cardOnline.querySelector('.element__img').src = itemSrc;
  cardOnline.querySelector('.element__img').alt = itemText;
  cardOnline.querySelector('.element__text').textContent = itemText;
  cardOnline.querySelector('.element__like').addEventListener('click', function() {like(cardOnline)});
  cardOnline.querySelector('.element__del').addEventListener('click', function() {del(cardOnline)});
  cardOnline.querySelector('.element__img').addEventListener('click', function() {openImg (cardOnline)});
  return cardOnline;
};
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
  toggleButton(buttonInfo, inputsInfo, inactiveButtonClass);
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
  toggleButton(buttonAdd, inputsAdd, inactiveButtonClass);
  openPopup(popupWinAdd);
};
function submitFormAdd (evt) {
  evt.preventDefault();
  element.prepend(createCard(inputAddLink.value, inputAddTitle.value));
  closePopup(popupWinAdd);
}
function like (cardElement) {
  cardElement.querySelector('.element__like').classList.toggle('element__like_active');
};
function del (cardElement) {
  cardElement.remove()
};
function openImg (cardElement) {
  popupImg.src = cardElement.querySelector('.element__img').src;
  popupImg.alt = cardElement.querySelector('.element__text').textContent;
  popupText.textContent = cardElement.querySelector('.element__text').textContent;
  openPopup(popupWinImg);
};

//отрисовка галереи
for (let i = 0; i<initialCards.length; i++) {
  element.append(createCard(initialCards[i].link, initialCards[i].name));
};

// обработчик закрытия попапов
popups.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close'))){
      closePopup(item);
    };
  });
});

//обработчик открытия и отправки формы Info
//buttonProfileInfo.addEventListener('click', openFormInfo(inactiveButtonClass));
formInfo.addEventListener('submit', submitFormInfo);

//обработчик открытия и отправки формы Add
//buttonProfileAdd.addEventListener('click', openFormAdd(inactiveButtonClass));
formAdd.addEventListener('submit', submitFormAdd);
