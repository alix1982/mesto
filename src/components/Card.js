//item.link, item.name, item.likes.length, item._id

export class Card {
  constructor ({ openImg, openPopupDel, toggleLike }, element, user, templateSelector)
  {
    this.element = element;
    // this._itemSrc = this.element.link;
    // this._itemText = this.element.name;
    // this._itemCounter = this.element.likes.length;
    this.user = user;
    //this.userId = user;
    //this.itemId = this.element._id;
    this.openImg = openImg;
    this.openPopupDel = openPopupDel;
    this.toggleLike = toggleLike;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._cardOnline = this._cardTemplate.querySelector('.element__list').cloneNode(true);
  }

  _getCard () {
    //console.log(this.user._id)
    this.elementImg.src = this.element.link;
    this.elementImg.alt = this.element.name;
    this._elementText.textContent = this.element.name;
    this._elementLikeCounter.textContent = this.element.likes.length;
  };

  _del = (user) => {
    if (user._id === this.element.owner._id) {
      this._elementDel.classList.add('element__del_active')
    }
  }

  addLike = () => {
    this._elementLike.classList.toggle('element__like_active');
    this._elementLikeCounter.textContent = this.element.likes.length;
  }

  _like = () => {
    if (this._elementLike.classList.contains('element__like_active')) {
      this.element.likes.forEach((item,index) => {
        if (item._id === this.user._id) {
          this.element.likes.splice(index,1)
        }
      })
      this.toggleLike (this.element._id, 'DELETE')
    }
    else {
      this.element.likes.push(this.user);
      this.toggleLike (this.element._id, 'PUT')
    }
  };

  _setLike = (user) => {
    this.element.likes.forEach((like) => {
      if (like._id === user._id) {
        this._elementLike.classList.add('element__like_active')
      }
    })
  }

  _setEventListeners () {
    this._elementLike.addEventListener('click', this._like);
    this._elementDel.addEventListener('click', () => {
      this.openPopupDel(this._cardOnline);
    });
    this.elementImg.addEventListener('click', () => {
      this.openImg ( this.element.link, this.element.name);
    });
  };

  createCard () {
    this.elementImg = this._cardOnline.querySelector('.element__img');
    this._elementText = this._cardOnline.querySelector('.element__text');
    this._elementLike = this._cardOnline.querySelector('.element__like');
    this._elementDel = this._cardOnline.querySelector('.element__del');
    this._elementLikeCounter = this._cardOnline.querySelector('.element__like_counter');
    this._getCard();
    this._del(this.user);
    this._setEventListeners ();
    this._setLike(this.user);
    return this._cardOnline;
  };
};