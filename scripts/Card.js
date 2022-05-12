import {openPopup} from './index.js';

export class Card {
  constructor (itemSrc, itemText) {
    this.itemSrc = itemSrc;
    this.itemText = itemText;
    this.cardTemplate = document.querySelector('#foto').content;
    this.cardOnline = this.cardTemplate.querySelector('.element__list').cloneNode(true);
  }
  
  _getCard () {
    this.cardOnline.querySelector('.element__img').src = this.itemSrc;
    this.cardOnline.querySelector('.element__img').alt = this.itemText;
    this.cardOnline.querySelector('.element__text').textContent = this.itemText;
  };
  _likeCard () {
    this.cardOnline.querySelector('.element__like').addEventListener('click', () => {
      this.cardOnline.querySelector('.element__like').classList.toggle('element__like_active')
    });
  };
  _deleteCard () {
    this.cardOnline.querySelector('.element__del').addEventListener('click', () => {
        this.cardOnline.remove();
        this.cardOnline = null;
    });
  };
  _openImg () {
    this.cardOnline.querySelector('.element__img').addEventListener('click', () => {
      const popupWinImg = document.querySelector('.popupImg');
      const popupImg = document.querySelector('.popupImg__img');
      const popupText = document.querySelector('.popupImg__text');
      popupImg.src = this.itemSrc;
      popupImg.alt = this.itemText;
      popupText.textContent = this.itemText;
      openPopup(popupWinImg);
    });
  };
  createCard () {
    this._getCard();
    this._likeCard ();
    this._deleteCard ();
    this._openImg ();
    return this.cardOnline;
  };
};