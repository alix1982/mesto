//item.link, item.name, item.likes.length, item._id

export class Card {
  constructor ({ openImg, openPopupDel, countLikes, getIdUser }, element, templateSelector)
  {
    this.element = element;
    this._itemSrc = this.element.link;
    this._itemText = this.element.name;
    this._itemCounter = this.element.likes.length;
    this._itemId = this.element._id;
    this.openImg = openImg;
    this.openPopupDel = openPopupDel;
    this.countLikes = countLikes;
    this._getIdUser = getIdUser;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._cardOnline = this._cardTemplate.querySelector('.element__list').cloneNode(true);
  }

  _getCard () {
    this.elementImg.src = this._itemSrc;
    this.elementImg.alt = this._itemText;
    this._elementText.textContent = this._itemText;
    this._elementLikeCounter.textContent = this._itemCounter;
    this.elementImg.id = this._itemId;
  };

  _del = (result) => {
    if ((result._id === this.element.owner._id) || (this.element.owner._id === 0)) {
      this._elementDel.classList.add('element__del_active')
    }
  }

  like = () => {
    if (this._elementLike.classList.contains('element__like_active')) {
      this._elementLikeCounter.textContent = Number(this._elementLikeCounter.textContent) - 1;
      this.countLikes (this.elementImg, 'DELETE')
        .then (() => {
          this._elementLike.classList.toggle('element__like_active');
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
      this._elementLikeCounter.textContent = Number(this._elementLikeCounter.textContent) + 1;
      this.countLikes (this.elementImg, 'PUT')
        .then (() => {
          this._elementLike.classList.toggle('element__like_active');
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };
  
  setLike = (result) => {

    this.element.likes.forEach((like) => {
      if (like._id === result._id) {
        this._elementLike.classList.add('element__like_active')
      }
    })
  }

  _setEventListeners () {
    this._elementLike.addEventListener('click', this.like);
    this._elementDel.addEventListener('click', () => {
      this.openPopupDel(this.elementImg, this._cardOnline);
    });
    this.elementImg.addEventListener('click', () => {
      this.openImg ( this._itemSrc, this._itemText);
    });
  };

  createCard () {
    this.elementImg = this._cardOnline.querySelector('.element__img');
    this._elementText = this._cardOnline.querySelector('.element__text');
    this._elementLike = this._cardOnline.querySelector('.element__like');
    this._elementDel = this._cardOnline.querySelector('.element__del');
    this._elementLikeCounter = this._cardOnline.querySelector('.element__like_counter');
    //console.log(this._cardOnline)
    this._getCard();
     this._getIdUser()
      .then((result) => {
        this._del(result);
        this.setLike(result);

      })
      .catch((err) => {
        console.log(err);
      })
    this._setEventListeners ();
    return this._cardOnline;
  };
};