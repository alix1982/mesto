

export class Card {
  constructor ({ openImg, openPopupDel, countLikes }, itemSrc, itemText, itemCounter, itemId, templateSelector)
  {
    this._itemSrc = itemSrc;
    this._itemText = itemText;
    this._itemCounter = itemCounter;
    this._itemId = itemId;
    this.openImg = openImg;
    this.openPopupDel = openPopupDel;
    this.countLikes = countLikes;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._cardOnline = this._cardTemplate.querySelector('.element__list').cloneNode(true);
  }

  _getCard () {
    this._elementImg.src = this._itemSrc;
    this._elementImg.alt = this._itemText;
    this._elementText.textContent = this._itemText;
    this._elementLikeCounter.textContent = this._itemCounter;
    this._elementImg.id = this._itemId;
  };

  _like = () => {
    this._elementLike.classList.toggle('element__like_active');
    if (this._elementLike.classList.contains('element__like_active')) {
      this._elementLikeCounter.textContent = Number(this._elementLikeCounter.textContent) + 1;
      this.countLikes (this._elementImg, 'PUT');
    }

    else {
      this._elementLikeCounter.textContent = Number(this._elementLikeCounter.textContent) - 1;
      this.countLikes (this._elementImg, 'DELETE');
    }
  };
  
  _setEventListeners () {
    this._elementLike.addEventListener('click', this._like);
    this._elementDel.addEventListener('click', () => {
      this.openPopupDel(this._cardOnline);
    });
    this._elementImg.addEventListener('click', () => {
      this.openImg ( this._itemSrc, this._itemText);
    });
  };
  
  createCard () {
    this._elementImg = this._cardOnline.querySelector('.element__img');
    this._elementText = this._cardOnline.querySelector('.element__text');
    this._elementLike = this._cardOnline.querySelector('.element__like');
    this._elementDel = this._cardOnline.querySelector('.element__del');
    this._elementLikeCounter = this._cardOnline.querySelector('.element__like_counter');
    //console.log(this._cardOnline)
    this._getCard();
    this._setEventListeners ();
    return this._cardOnline;
  };
};