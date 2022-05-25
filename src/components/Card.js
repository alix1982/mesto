export class Card {
  constructor ({ openImg }, itemSrc, itemText, templateSelector)
  {
    this._itemSrc = itemSrc;
    this._itemText = itemText;
    this.openImg = openImg;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._cardOnline = this._cardTemplate.querySelector('.element__list').cloneNode(true);
  }
  
  _getCard () {
    this._elementImg.src = this._itemSrc;
    this._elementImg.alt = this._itemText;
    this._elementText.textContent = this._itemText;
  };

  _like = () => {
    this._elementLike.classList.toggle('element__like_active');
  };
  _del = () => {
    this._cardOnline.remove();
    this._cardOnline = null;
  };
  
  _setEventListeners () {
    this._elementLike.addEventListener('click', this._like);
    this._elementDel.addEventListener('click', this._del)
    this._elementImg.addEventListener('click', () => {
      this.openImg ( this._itemSrc, this._itemText);
    });
  };
  
  createCard () {
    this._elementImg = this._cardOnline.querySelector('.element__img');
    this._elementText = this._cardOnline.querySelector('.element__text');
    this._elementLike = this._cardOnline.querySelector('.element__like');
    this._elementDel = this._cardOnline.querySelector('.element__del');
    this._getCard();
    this._setEventListeners ();
    return this._cardOnline;
  };
};