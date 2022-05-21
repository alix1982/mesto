import {PopupWithImage} from './PopupWithImage.js';

export class Card {
  constructor (itemSrc, itemText) {
    this._itemSrc = itemSrc;
    this._itemText = itemText;
    this._cardTemplate = document.querySelector('#foto').content;
    this._cardOnline = this._cardTemplate.querySelector('.element__list').cloneNode(true);

  }
  
  _getCard () {
    this._cardOnline.querySelector('.element__img').src = this._itemSrc;
    this._cardOnline.querySelector('.element__img').alt = this._itemText;
    this._cardOnline.querySelector('.element__text').textContent = this._itemText;
  };
  _likeCard () {
    this._cardOnline.querySelector('.element__like').addEventListener('click', () => {
      this._cardOnline.querySelector('.element__like').classList.toggle('element__like_active')
    });
  };
  _deleteCard () {
    this._cardOnline.querySelector('.element__del').addEventListener('click', () => {
        this._cardOnline.remove();
        this._cardOnline = null;
    });
  };

  createCard () {
    this._getCard();
    this._likeCard ();
    this._deleteCard ();
    const popupImg = new PopupWithImage ();
    popupImg.openPopup(this._cardOnline, this._itemSrc, this._itemText);
    return this._cardOnline;
  };
};