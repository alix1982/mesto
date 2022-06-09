export class Api {
  constructor (
      {heading}
      )
  {
     this.heading = heading
  }

  _getStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  patchUserInfo = (url, inputList) => {
    return (fetch(url, {
        method: 'PATCH',
        headers: this.heading,
        body: JSON.stringify({
          name: inputList.name,
          about: inputList.work
        })
      })
      .then(res => this._getStatus(res))
    );
  }

  postAddCard = (url, inputList) => {
    return (fetch(url, {
      method: 'POST',
      headers: this.heading,
      body: JSON.stringify({
        name: inputList.title,
        link: inputList.link
      })
    })
      .then(res => this._getStatus(res))
    )
  };

  patchUserAvatar = (url, inputList) => {
    return (fetch(url, {
      method: 'PATCH',
      headers: this.heading,
       body: JSON.stringify({
         avatar: inputList.linkAvatar,
      })
    })
      .then(res => this._getStatus(res))
    )
  }

  deleteCardDel = (url, imgCard, method) => {
    return (fetch (url +`${imgCard.id}`, {
        method: method,
        headers: this.heading,
      })
      .then(res => this._getStatus(res))
    )
  }

  getCounterLike = (url, elementImg, method) => {
    return (fetch(url + `${elementImg.id}/likes`, {
      method: method,
      headers: this.heading,
      body: JSON.stringify({
      })
    })
      .then(res => this._getStatus(res))
    )
  }

  getCards = (url) => {
    return (fetch(url, {
      method: 'GET',
      headers: this.heading
    })
      .then(res => this._getStatus(res))
    ); 
  }

  getUser = (url) => {
    return (fetch(url, {
      method: 'GET',
      headers: this.heading
    })
      .then(res => this._getStatus(res))
    )
  }
}