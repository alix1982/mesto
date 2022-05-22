export class Card {
  constructor ({ 
      openImg
    }, itemSrc, itemText
  ) 
  {
    this._itemSrc = itemSrc;
    this._itemText = itemText;
    this.openImg = openImg;
    this._cardTemplate = document.querySelector('#foto').content;
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
  _likeCard () {this._elementLike.addEventListener('click', this._like)};

  _del = () => {
    this._cardOnline.remove();
    this._cardOnline = null;
  };
  _deleteCard () {this._elementDel.addEventListener('click', this._del)};

  _openImage = () => {
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
    this._likeCard ();
    this._deleteCard ();
    this._openImage();
    return this._cardOnline;
  };
};