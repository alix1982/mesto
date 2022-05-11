import {openPopup} from './index.js';

export class Card {
  constructor () {
    this.cardTemplate = document.querySelector('#foto').content;
    this.cardOnline = this.cardTemplate.querySelector('.element__list').cloneNode(true);
  }
  
  _getCard (itemSrc, itemText) {
    this.cardOnline.querySelector('.element__img').src = itemSrc;
    this.cardOnline.querySelector('.element__img').alt = itemText;
    this.cardOnline.querySelector('.element__text').textContent = itemText;
  };
  _likeCard () {
    this.cardOnline.querySelector('.element__like').addEventListener('click', () => {
      this.cardOnline.querySelector('.element__like').classList.toggle('element__like_active')
    });
  };
  _delCard () {
    this.cardOnline.querySelector('.element__del').addEventListener('click', () => {
        this.cardOnline.remove();
    });
  };
  _openImg () {
    this.cardOnline.querySelector('.element__img').addEventListener('click', () => {
      const popupWinImg = document.querySelector('.popupImg');
      const popupImg = document.querySelector('.popupImg__img');
      const popupText = document.querySelector('.popupImg__text');
      popupImg.src = this.cardOnline.querySelector('.element__img').src;
      popupImg.alt = this.cardOnline.querySelector('.element__text').textContent;
      popupText.textContent = this.cardOnline.querySelector('.element__text').textContent;
      openPopup(popupWinImg);
    });
  };
  createCard (itemSrc, itemText) {
    this._getCard(itemSrc, itemText);
    this._likeCard ();
    this._delCard ();
    this._openImg ();
    return this.cardOnline;
  };
};